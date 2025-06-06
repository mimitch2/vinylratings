import React, { useRef, useEffect } from 'react';
import { FlashList } from '@shopify/flash-list';
import { useList } from 'hooks';
import {
    VRContainer,
    VRReleaseOptionsModal,
    VRError,
    VRLoading,
    VRReleasesList
} from 'components';
import { Nav, Releases } from 'types';
import { GET_VERSIONS } from './versionsQueries';
import { PRESSED_OR_DISABLED_OPACITY } from 'constants/index';

type Params = {
    masterId: string;
    artist: string;
};

type Route = {
    params: Params;
};

const Versions = ({ navigation, route }: { navigation: Nav; route: Route }) => {
    const {
        params: { masterId, artist }
    } = route;
    const scrollViewRef = useRef<FlashList<Releases> | null>(null);

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
        QUERY: GET_VERSIONS,
        queryKey: 'getMasterReleaseVersions',
        additionalVariables: {
            master_id: +masterId
            // country: '',
            // released: ''
        }
    });

    useEffect(() => {
        if (data) {
            navigation.setOptions({
                title: `Pressings(${data?.getMasterReleaseVersions?.pagination.items})`
            });
        }

        // return () => {
        //     navigation.setOptions({
        //         title: 'Pressings'
        //     });
        // };
    }, [data, navigation]);

    if (initialLoading) {
        return <VRLoading />;
    }

    const versions = data?.getMasterReleaseVersions?.versions ?? [];

    return (
        <VRContainer
            startAnimation={!!data}
            scrollable={false}
            styleOverride={{
                paddingBottom: 35
            }}
        >
            {error && (
                <VRError
                    error={error}
                    trackID="versions_screen-error"
                    level="error"
                    styleOverride={{
                        opacity: loading ? PRESSED_OR_DISABLED_OPACITY : 1
                    }}
                />
            )}
            {loading && !loadingMore && !reloading && <VRLoading />}
            {versions?.length ? (
                <>
                    <VRReleaseOptionsModal
                        sort={sort}
                        setSort={setSort}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                    />
                    <VRReleasesList
                        nextRoute="VersionRelease"
                        artist={artist}
                        innerRef={scrollViewRef}
                        data={versions}
                        loading={loading || false}
                        reloading={reloading}
                        loadingMore={loadingMore}
                        onRefresh={onRefresh}
                        onLoadMore={onLoadMore}
                        navigation={navigation}
                        sort={sort}
                        isVersions
                    />
                </>
            ) : null}
        </VRContainer>
    );
};

export default Versions;
