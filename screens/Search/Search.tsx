import React, { useState, useRef, useCallback, useEffect } from 'react';
import type { FlatList } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useLazyList } from 'hooks';

import {
    VRContainer,
    VRReleaseOptionsModal,
    VRError,
    VRLoading,
    VRReleasesList,
    VRSearchInput
} from 'components';
import { GET_SEARCH } from './searchQueries';
import { Nav } from 'types';
import { client } from '../../ApolloProviderWrapper';

const Search = ({ navigation }: { navigation: Nav }) => {
    console.log('render');

    const scrollViewRef = useRef<FlatList>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [type, setType] = useState('release');

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
        sortDefault: 'artist'
    });
    const { cache } = client;

    const clearQueryCache = useCallback(() => {
        cache.evict({
            id: 'ROOT_QUERY',
            fieldName: 'getSearch',
            broadcast: false
        });

        cache.gc();
    }, [cache]);

    const runSearchQuery = useCallback(
        ({ variables }: any) => {
            clearQueryCache();
            search({ variables });
        },

        [search, clearQueryCache]
    );

    useEffect(() => {
        if (called && !searchTerm.length) {
            clearQueryCache();

            // navigation.dispatch(
            //     CommonActions.reset({
            //         routes: [{ name: 'Search' }]
            //     })
            // );
        }
    }, [searchTerm, clearQueryCache, called]);

    useEffect(() => {
        if (data) {
            navigation.setOptions({
                title: `Search(${
                    data?.getSearch?.pagination?.items.toLocaleString() || '?'
                })`
            });
        }
    }, [data, navigation]);

    const results =
        data?.getSearch?.results ?? previousData?.getSearch?.results;

    const isLoading =
        (loading && !loadingMore && !reloading) || isSortingOrFiltering;

    return (
        <>
            <VRSearchInput
                runQuery={runSearchQuery}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
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
                />

                {error ? (
                    <VRError
                        error={error}
                        trackID="search_screen-error"
                        level="error"
                        styleOverride={{
                            opacity: loading ? 0.5 : 1
                        }}
                    />
                ) : null}

                {!called ? (
                    <VRError
                        message="Enter a search term"
                        level="info"
                        styleOverride={{
                            opacity: loading ? 0.5 : 1
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
                            opacity: loading ? 0.5 : 1
                        }}
                    />
                ) : null}
            </VRContainer>
        </>
    );
};

export default Search;
