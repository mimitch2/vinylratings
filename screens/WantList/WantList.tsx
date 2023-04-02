import React, { useRef, useEffect } from 'react';
import { FlatList } from 'react-native';

import {
    VRContainer,
    VRLoading,
    VRText,
    VRReleaseOptionsModal,
    VRReleasesList,
    VRError
} from 'components';
import { useList } from 'hooks';
import { Nav } from 'types';
import { GET_WANT_LIST } from './wantListQueries';

const WantList = ({ navigation }: { navigation: Nav }) => {
    const scrollViewRef = useRef<FlatList>(null);

    const {
        initialLoading,
        loading,
        reloading,
        loadingMore,
        data,
        error,
        sort,
        setSort,
        onRefresh,
        onLoadMore,
        sortOrder,
        setSortOrder
    } = useList({
        scrollViewRef,
        QUERY: GET_WANT_LIST,
        queryKey: 'getWantList',
        sortDefault: 'genre/artist'
    });

    useEffect(() => {
        if (data) {
            navigation.setOptions({
                title: `Want(${data?.getWantList?.pagination.items})`
            });
        }
    }, [data, navigation]);

    if (initialLoading) {
        return <VRLoading />;
    }

    if (!data || error) {
        return (
            <VRText>{`${error?.message || 'Something went wrong!'}`}</VRText>
        );
    }

    const {
        getWantList: { wants }
    } = data ?? [];

    return (
        <VRContainer
            startAnimation={!!data}
            scrollable={false}
            styleOverride={{
                paddingBottom: 35
            }}
        >
            {loading && !loadingMore && !reloading && <VRLoading />}

            <VRReleaseOptionsModal
                sort={sort}
                setSort={setSort}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                isWantList
            />
            {wants?.length ? (
                <VRReleasesList
                    innerRef={scrollViewRef}
                    data={wants}
                    loading={loading || false}
                    reloading={reloading}
                    loadingMore={loadingMore}
                    onRefresh={onRefresh}
                    onLoadMore={onLoadMore}
                    navigation={navigation}
                    sort={sort}
                    inCollection={false}
                    inWantList
                />
            ) : (
                <VRError
                    message="There do not seem to be any items here"
                    level="warning"
                    styleOverride={{
                        opacity: loading ? 0.5 : 1
                    }}
                />
            )}
        </VRContainer>
    );
};

export default WantList;
