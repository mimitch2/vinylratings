import React, { useState, useRef, useCallback, useEffect } from 'react';
import type { FlatList } from 'react-native';
import { CommonActions, useTheme } from '@react-navigation/native';

import { useLazyList } from 'hooks';
import { Theme } from 'styles';
import { toUpperFirst } from 'helpers';
import { SearchTypes, Nav } from 'types';
import { PRESSED_OR_DISABLED_OPACITY } from 'constants/index';

const SEARCH_TYPES = Object.values(SearchTypes).map((type) => ({
    label: toUpperFirst(type),
    value: type
}));

import {
    VRContainer,
    VRReleaseOptionsModal,
    VRError,
    VRLoading,
    VRReleasesList,
    VRSearchInput,
    VRSegmented
} from 'components';
import { GET_SEARCH } from './searchQueries';
import { client } from '../../ApolloProviderWrapper';

const Search = ({ navigation }: { navigation: Nav }) => {
    const scrollViewRef = useRef<FlatList>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState(SearchTypes.RELEASE);

    const sortDefault = 'artist';

    const {
        called,
        data,
        error,
        loading,
        loadingMore,
        isSortingOrFiltering,
        onLoadMore,
        onRefresh,
        previousData,
        reloading,
        search,
        setSort,
        setSortOrder,
        sort,
        sortOrder
    } = useLazyList({
        scrollViewRef,
        QUERY: GET_SEARCH,
        queryKey: 'getSearch',
        sortDefault,
        type: searchType
    });
    const { cache } = client;
    const { colors }: Theme = useTheme();

    const handleSearchTypePress = (value: SearchTypes) => {
        setSearchType(value);
    };

    const runSearchQuery = useCallback(
        ({ variables }: any) => {
            console.log(
                '🚀 ~ file: Search.tsx:216 ~ Search ~ variables:',
                variables
            );

            search({ variables });
        },

        [search]
    );

    useEffect(() => {
        if (called && !searchTerm.length) {
            const clearQueryCache = () => {
                // cache.evict({
                //     id: 'ROOT_QUERY',
                //     fieldName: 'getSearch',
                //     broadcast: false
                // });

                // cache.gc();

                cache.modify({
                    fields: {
                        getSearch() {
                            return {
                                results: [],
                                pagination: {
                                    __typename: 'Pagination',
                                    items: 0,
                                    page: 1,
                                    pages: 1,
                                    perPage: 25
                                }
                            };
                        }
                    },
                    broadcast: true
                });
            };
            clearQueryCache();
            // navigation.dispatch(
            //     CommonActions.reset({
            //         routes: [{ name: 'Search' }]
            //     })
            // );
        }
    }, [searchTerm, called, cache]);

    useEffect(() => {
        if (data) {
            navigation.setOptions({
                title: `Search(${
                    data?.getSearch?.pagination?.items.toLocaleString() || '?'
                })`
            });
        }
    }, [data, navigation]);

    const results = data?.getSearch?.results ?? null;

    const isLoading =
        (loading && !loadingMore && !reloading) || isSortingOrFiltering;

    return (
        <>
            <VRSearchInput
                runQuery={runSearchQuery}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <VRSegmented
                data={SEARCH_TYPES}
                onPress={handleSearchTypePress}
                containerStyleOverride={{
                    paddingBottom: 0
                }}
                labelStyleOverride={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    marginVertical: 0
                }}
            />
            <VRContainer
                startAnimation
                scrollable={false}
                styleOverride={{
                    paddingBottom: 65
                }}
            >
                {isLoading && <VRLoading />}

                <VRReleaseOptionsModal
                    sort={sort}
                    setSort={setSort}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    isArtistSearch={searchType === SearchTypes.ARTIST}
                />

                {error ? (
                    <VRError
                        error={error}
                        trackID="search_screen-error"
                        level="error"
                        styleOverride={{
                            opacity: loading ? PRESSED_OR_DISABLED_OPACITY : 1
                        }}
                    />
                ) : null}

                {!called ? (
                    <VRError
                        message="Enter a search term"
                        level="info"
                        styleOverride={{
                            opacity: loading ? PRESSED_OR_DISABLED_OPACITY : 1
                        }}
                    />
                ) : null}

                {called && results?.length ? (
                    <VRReleasesList
                        innerRef={scrollViewRef}
                        data={results ?? []}
                        loading={loading || isLoading}
                        reloading={reloading}
                        loadingMore={loadingMore}
                        onRefresh={onRefresh}
                        onLoadMore={onLoadMore}
                        navigation={navigation}
                        sort={sort}
                        isSearch
                    />
                ) : null}

                {called && !results?.length && !loading ? (
                    <VRError
                        message="Nothing found! Try changing your search"
                        level="warning"
                        styleOverride={{
                            opacity: loading ? PRESSED_OR_DISABLED_OPACITY : 1
                        }}
                    />
                ) : null}
            </VRContainer>
        </>
    );
};

export default Search;
