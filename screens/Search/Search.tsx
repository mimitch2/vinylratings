import React, { useState, useRef, useCallback, useEffect } from 'react';
import type { FlatList } from 'react-native';

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
    const scrollViewRef = useRef<FlatList>(null);
    const [searchTerm, setSearchTerm] = useState('');
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
            broadcast: true
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
        if (called && searchTerm.length < 3) {
            clearQueryCache();
        }
    }, [searchTerm, clearQueryCache, called]);

    useEffect(() => {
        if (data) {
            navigation.setOptions({
                title: `Search(${data?.getSearch?.pagination?.items || '?'})`
            });
        }
    }, [data, navigation]);

    const results =
        data?.getSearch?.results ?? previousData?.getSearch?.results;

    const isLoading =
        (loading && !loadingMore && !reloading) || isSortingOrFiltering;

    return (
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
            <VRSearchInput
                runQuery={runSearchQuery}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
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
    );
};

export default Search;
