import React, { useRef, useEffect } from 'react';
import { FlatList } from 'react-native';

import { useList, useGetFolders } from 'hooks';
import {
    VRContainer,
    VRReleaseOptionsModal,
    VRError,
    VRLoading,
    VRReleasesList,
    VRText
} from 'components';
import { Nav } from 'types';
import { GET_COLLECTION } from './collectionQueries';
import { PRESSED_OR_DISABLED_OPACITY } from 'constants/index';

const Collection = ({ navigation }: { navigation: Nav }) => {
    const scrollViewRef = useRef<FlatList>(null);
    const { folders, folder, setFolder, foldersLoading } = useGetFolders();

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
        QUERY: GET_COLLECTION,
        queryKey: 'getCollection',
        folder
    });

    // useEffect(() => {
    //     if (data) {
    //         navigation.setOptions({
    //             title: `Collection:${folder.name}(${data?.getCollection?.pagination.items})`
    //         });
    //     }
    // }, [data, folder, navigation]);

    if (initialLoading || foldersLoading) {
        return <VRLoading />;
    }

    if (!data || error) {
        return (
            <VRText>{`${error?.message || 'Something went wrong!'}`}</VRText>
        );
    }

    const releases = data?.getCollection?.releases ?? [];
    console.log(
        '🚀 ~ file: Collection.tsx:60 ~ Collection ~ releases:',
        releases
    );

    return (
        <VRContainer
            startAnimation={!!data || !!error}
            scrollable={false}
            styleOverride={{
                paddingBottom: 35
            }}
        >
            {error && (
                <VRError
                    error={error}
                    trackID="collection_screen-error"
                    level="error"
                    styleOverride={{
                        opacity: loading ? PRESSED_OR_DISABLED_OPACITY : 1
                    }}
                />
            )}

            {(loading || foldersLoading) && !loadingMore && !reloading && (
                <VRLoading />
            )}

            <VRReleaseOptionsModal
                sort={sort}
                setSort={setSort}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                folders={folders}
                folder={folder}
                setFolder={setFolder}
            />

            {releases?.length && (
                <VRReleasesList
                    innerRef={scrollViewRef}
                    data={releases}
                    loading={loading || false}
                    reloading={reloading}
                    loadingMore={loadingMore}
                    onRefresh={onRefresh}
                    onLoadMore={onLoadMore}
                    navigation={navigation}
                    sort={sort}
                />
            )}

            {!releases.length && !error ? (
                <VRError
                    message="There do not seem to be any items here"
                    level="warning"
                    styleOverride={{
                        opacity: loading ? PRESSED_OR_DISABLED_OPACITY : 1
                    }}
                />
            ) : null}
        </VRContainer>
    );
};

export default Collection;
