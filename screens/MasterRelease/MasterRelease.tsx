import React, { useState } from 'react';
import { Image, View, Pressable, StyleSheet, StatusBar } from 'react-native';
import { useQuery } from '@apollo/client';
import { useTheme } from '@react-navigation/native';

import { GET_MASTER_RELEASE } from './masterReleaseQueries';
import {
    VRContainer,
    VRError,
    VRIcon,
    VRImageModal,
    VRListIndicator,
    VRLoading,
    VRModal,
    VRPressable,
    VRSegmented,
    VRTag,
    VRText,
    VRWebViewModal,
    VRTrackList
} from 'components';
import type { Nav } from 'types';
import { WIDTH } from 'constants/index';
import { Vinyl } from 'svgs';
import { Theme } from 'styles';

type Params = {
    id: string;
    inCollection?: boolean;
    inWantList?: boolean;
};

export type Route = {
    params: Params;
};

const IMAGE_STYLE = {
    borderRadius: 4,
    width: WIDTH / 2,
    height: WIDTH / 2
};

const MasterRelease = ({
    route,
    navigation
}: {
    route: Route;
    navigation: Nav;
}) => {
    const { colors }: Theme = useTheme();

    const [imageModalOpen, setImageModalOpen] = useState(false);
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
                    <View style={styles.title}>
                        <View>
                            <VRText fontWeight="bold" size={24}>
                                {artist}
                            </VRText>
                            <VRText fontStyle="italic" size={18}>
                                {title}
                            </VRText>
                        </View>
                        <View>
                            <VRListIndicator
                                userData={{
                                    in_collection: !!inCollection,
                                    in_wantlist: !!inWantList
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.upperContainer}>
                        <Pressable
                            onPress={() => {
                                setImageModalOpen(true);
                                StatusBar.setHidden(true);
                            }}
                        >
                            {images && images.length ? (
                                <Image
                                    source={{ uri: images[0].resource_url }}
                                    style={IMAGE_STYLE}
                                />
                            ) : (
                                <View style={IMAGE_STYLE}>
                                    <Vinyl />
                                </View>
                            )}
                        </Pressable>
                        {images && images.length ? (
                            <VRImageModal
                                images={images}
                                modalOpen={imageModalOpen}
                                setModalOpen={setImageModalOpen}
                            />
                        ) : null}
                        <View>
                            {tags.map((tag) => (
                                <VRTag key={tag} tag={tag} size="lg" />
                            ))}
                        </View>
                    </View>

                    <VRText
                        styleOverride={{ paddingVertical: 5 }}
                    >{`Released: ${year}`}</VRText>

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
