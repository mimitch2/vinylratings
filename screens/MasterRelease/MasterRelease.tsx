import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { useTheme } from '@react-navigation/native';

import { GET_MASTER_RELEASE } from './masterReleaseQueries';
import {
    VRContainer,
    VRError,
    VRIcon,
    VRLoading,
    VRPressable,
    VRSegmented,
    VRText,
    VRTrackList,
    VRReleaseInfoCommon
} from 'components';
import type { Nav } from 'types';
import { Theme } from 'styles';

type Params = {
    id: string;
    inCollection?: boolean;
    inWantList?: boolean;
};

export type Route = {
    params: Params;
};

const MasterRelease = ({
    route,
    navigation
}: {
    route: Route;
    navigation: Nav;
}) => {
    const { colors }: Theme = useTheme();

    // const [discogsReviewsModalOpen, setDiscogsReviewsModalOpen] =
    //     useState(false);
    const {
        params: { id, inWantList, inCollection }
    } = route;

    // Queries
    const { data, loading, refetch, error } = useQuery(GET_MASTER_RELEASE, {
        variables: {
            id: +id
        }
    });

    const refetchRelease = () => {
        refetch();
    };

    if (loading) {
        return <VRLoading />;
    }

    if (error) {
        return (
            <VRContainer startAnimation>
                <VRError
                    level="error"
                    error={error}
                    trackID="release_screen-error"
                />
            </VRContainer>
        );
    }

    const getMasterRelease = data?.getMasterRelease;

    const {
        title,
        artists,
        images,
        tracklist,
        year,
        genres,
        styles: releaseStyles
        // main_release,
        // most_recent_release,
        // num_for_sale,
        // lowest_price
    } = getMasterRelease ?? {};

    const tags = ['Master', ...genres, releaseStyles];

    const segmentedData = [
        {
            label: 'Tracklist',
            component: <VRTrackList tracklist={tracklist} />
        }
    ];

    const [{ name: artist }] = artists;

    return (
        <>
            <VRContainer
                onRefresh={refetchRelease}
                refreshing={loading}
                startAnimation={!!getMasterRelease || !!error}
            >
                {loading ? <VRLoading /> : null}
                <View style={{ paddingBottom: 20 }}>
                    <VRReleaseInfoCommon
                        images={images}
                        tags={tags}
                        isInCollection={!!inCollection}
                        inWantList={!!inWantList}
                        title={title}
                        artist={artist}
                        releasedDate={year}
                    />

                    <VRPressable
                        trackID="release_screen-see_all_versions"
                        onPress={() => {
                            navigation.navigate({
                                name: 'Versions',
                                params: {
                                    masterId: id,
                                    artist: artists[0]?.name ?? 'Unknown'
                                }
                            });
                        }}
                    >
                        <View
                            style={[
                                styles.versions,
                                { borderColor: colors.primaryFaded }
                            ]}
                        >
                            <VRText>See all pressings</VRText>
                            <VRIcon type="chevronRight" size="sm" />
                        </View>
                    </VRPressable>

                    <VRSegmented data={segmentedData} />

                    {/* <VRWebViewModal
                        uri={uri}
                        discogsReviewsModalOpen={discogsReviewsModalOpen}
                        setDiscogsReviewsModalOpen={setDiscogsReviewsModalOpen}
                    /> */}
                </View>
            </VRContainer>
        </>
    );
};

const styles = StyleSheet.create({
    upperContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    },
    versions: {
        marginVertical: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default MasterRelease;
