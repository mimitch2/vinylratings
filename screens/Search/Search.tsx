import React, { useState, useRef } from 'react';
import type { FlatList } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { useLazyList } from 'hooks';
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

const Search = ({ navigation }: { navigation: Nav }) => {
    const scrollViewRef = useRef<FlatList>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState<SearchTypes>(
        SearchTypes.RELEASE
    );

    const sortDefault = 'artist';

    const args = {
        scrollViewRef,
        QUERY: GET_SEARCH,
        queryKey: 'getSearch',
        sortDefault,
        type: searchType,
        searchTerm
    };

    const {
        called,
        data,
        error,
        loading,
        loadingMore,
        isSortingOrFiltering,
        onLoadMore,
        onRefresh,
        // previousData,
        reloading,
        setSort,
        setSortOrder,
        sort,
        sortOrder,
        isTyping
    } = useLazyList(args);

    const handleSearchTypePress = (value: SearchTypes) => {
        setSearchType(value);
    };

    const results = data?.getSearch?.results ?? [];

    const isLoading =
        (loading && !loadingMore && !reloading) || isSortingOrFiltering;

    return (
        <>
            <Layout>
                <VRSearchInput
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
            </Layout>

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

                {!called || !searchTerm.length ? (
                    <VRError
                        message="Enter a search term"
                        level="info"
                        styleOverride={{
                            opacity: loading ? PRESSED_OR_DISABLED_OPACITY : 1
                        }}
                    />
                ) : null}

                {called && results?.length && searchTerm.length ? (
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
