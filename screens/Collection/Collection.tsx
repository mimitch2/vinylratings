import React, { useRef, useEffect } from 'react';
import { FlashList } from '@shopify/flash-list';

import { useList, useGetFolders } from 'hooks';
import {
    VRContainer,
    VRReleaseOptionsModal,
    VRError,
    VRLoading,
    VRReleasesList,
    VRText
} from 'components';
import { Nav, Releases } from 'types';
import { GET_COLLECTION } from './collectionQueries';
import { PRESSED_OR_DISABLED_OPACITY } from 'constants/index';

const Collection = ({ navigation }: { navigation: Nav }) => {
    const scrollViewRef = useRef<FlashList<Releases> | null>(null);
    const { folders, folder, setFolder, foldersLoading } = useGetFolders();

    const {
        initialLoading,
        loading,
        reloading,
        loadingMore,
        data,
        previousData,
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

    // {
    //     error ? (
    //         <VRError
    //             error={error}
    //             trackID="collection_screen-error"
    //             level="error"
    //             styleOverride={{
    //                 opacity: loading ? PRESSED_OR_DISABLED_OPACITY : 1
    //             }}
    //         />
    //     ) : null;
    // }

    const releases =
        data?.getCollection?.releases ??
        previousData?.getCollection?.releases ??
        [];

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

            <VRReleaseOptionsModal
                sort={sort}
                setSort={setSort}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                folders={folders}
                folder={folder}
                setFolder={setFolder}
            />
            {releases?.length ? (
                <VRReleasesList
                    innerRef={scrollViewRef}
                    data={releases}
                    loading={loading}
                    reloading={reloading}
                    loadingMore={loadingMore}
                    onRefresh={onRefresh}
                    onLoadMore={onLoadMore}
                    navigation={navigation}
                    sort={sort}
                />
            ) : null}
            {!releases.length && !error && !loading ? (
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
