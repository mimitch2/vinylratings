import React, { useState } from 'react';
import { Image, View, Pressable, StyleSheet, StatusBar } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { useTheme } from '@react-navigation/native';

import { FolderModalContent } from 'components/VRReleaseOptionsModal/components';
import {
    GET_RELEASE,
    ADD_RELEASE,
    ADD_TO_COLLECTION,
    REMOVE_FROM_COLLECTION,
    ADD_RATING,
    ADD_WASHED_ON
} from './releaseQueries';
import {
    VRButton,
    VRCalendarModal,
    VRContainer,
    VRError,
    VRIcon,
    VRImageModal,
    VRListIndicator,
    VRLoading,
    VRModal,
    VRPressable,
    VRRateModal,
    VRRatings,
    VRSegmented,
    VRTag,
    VRText,
    VRWebViewModal,
    VRFooter
} from 'components';
import type { Route, DiscogsRelease, Folder, Nav, RatingPayload } from 'types';
import { getReleaseTags } from 'helpers';
import { WIDTH } from 'constants/index';
import { TrackList, Identifiers } from './components';
import { Vinyl } from 'svgs';
import { useIsInCollection, useGetFolders, IS_IN_COLLECTION } from 'hooks';
import { client } from '../../ApolloProviderWrapper';
import { Theme } from 'styles';

const IMAGE_STYLE = {
    borderRadius: 4,
    width: WIDTH / 2,
    height: WIDTH / 2
};

const Release = ({ route, navigation }: { route: Route; navigation: Nav }) => {
    const { colors }: Theme = useTheme();

    const [washedOn, setWashedOn] = useState('');
    const [calendarModalOpen, setCalendarModalOpen] = useState(false);
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [folderModalOpen, setFolderModalOpen] = useState(false);
    const [rateModalOpen, setRateModalOpen] = useState(false);
    const [discogsReviewsModalOpen, setDiscogsReviewsModalOpen] =
        useState(false);
    const {
        params: { id, inWantList, isFromVersions }
    } = route;

    // Queries
    const {
        isInCollection,
        releases,
        isInCollectionLoading,
        refetchIsInCollection
    } = useIsInCollection({ releaseId: +id });

    const { data, loading, refetch, error } = useQuery(GET_RELEASE, {
        variables: {
            id: +id
        }
    });

    const { folders } = useGetFolders();
    const foldersWithoutAll = folders.slice(1);

    // Mutations
    const [addToCollectionMutation, { loading: addToCollectionLoading }] =
        useMutation(ADD_TO_COLLECTION);
    const [
        removeFromCollectionMutation,
        { loading: removeFromCollectionLoading }
    ] = useMutation(REMOVE_FROM_COLLECTION);
    const [addRelease, { loading: addReleaseLoading }] =
        useMutation(ADD_RELEASE);
    const [addRating, { loading: addRatingLoading }] = useMutation(ADD_RATING, {
        refetchQueries: [{ query: GET_RELEASE }, 'GetRelease']
    });
    const [addWashedOn, { loading: washedOnLoading }] = useMutation(
        ADD_WASHED_ON,
        {
            refetchQueries: [{ query: GET_RELEASE }, 'GetRelease']
        }
    );
    const toggleFolderModal = () => {
        setFolderModalOpen((prevState) => !prevState);
    };

    const optimisticallyUpdateIsInCollection = (value: boolean) => {
        client.writeQuery({
            query: IS_IN_COLLECTION,
            data: {
                getReleaseInCollection: {
                    __typename: 'IsInCollectionResponse',
                    isInCollection: value,
                    releases: value ? releases : []
                }
            },
            variables: {
                id: +id
            }
        });
    };

    const addToCollection = async (folderItem: Folder) => {
        try {
            await addToCollectionMutation({
                variables: {
                    folderId: +folderItem.id,
                    releaseId: +id
                },
                onCompleted: () => {
                    optimisticallyUpdateIsInCollection(true);
                    refetchIsInCollection();
                }
            });
        } catch (err: any) {
            throw new Error(err);
        } finally {
            setFolderModalOpen(false);
        }
    };

    const removeFromCollection = async () => {
        try {
            await removeFromCollectionMutation({
                variables: {
                    folderId: +releases.length && +releases[0].folder_id,
                    releaseId: +id,
                    instanceId: +releases.length && +releases[0].instance_id
                },
                onCompleted: (response) => {
                    if (response?.removeFromCollection?.isGood) {
                        optimisticallyUpdateIsInCollection(false);
                        refetchIsInCollection();
                    }
                }
            });
        } catch (err: any) {
            throw new Error(err);
        }
    };

    const refetchRelease = () => {
        refetchIsInCollection();
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

    const { getRelease }: { getRelease: DiscogsRelease } = data ?? null;

    const {
        uri,
        master_id,
        title,
        artists,
        images,
        tracklist,
        identifiers,
        released,
        notes: releaseNotes,
        vinylRatingsRelease,
        community
    } = getRelease;

    const submitRating = async (ratings: RatingPayload) => {
        try {
            await addRating({
                variables: {
                    releaseId: +id,
                    ...ratings
                }
            });
        } catch (err: any) {
            throw new Error(err);
        }
    };

    const submit = async (ratings: RatingPayload) => {
        if (!vinylRatingsRelease) {
            try {
                await addRelease({
                    variables: {
                        releaseId: +id,
                        title,
                        artist: artists[0].name
                    }
                });

                await submitRating(ratings);
            } catch (err: any) {
                throw new Error(err);
            }
        } else {
            await submitRating(ratings);
        }
    };

    const tags = getReleaseTags({ item: getRelease, limit: false });

    const segmentedData = [
        {
            header: 'Ratings',
            component: (
                <VRRatings
                    discogsRating={community.rating}
                    vinylRatingsRelease={vinylRatingsRelease}
                    setDiscogsReviewsModalOpen={setDiscogsReviewsModalOpen}
                />
            )
        },
        {
            header: 'Tracklist',
            component: <TrackList tracklist={tracklist} />
        },
        {
            header: 'Notes',
            component: (
                <VRText styleOverride={{ marginTop: 10 }}>
                    {releaseNotes}
                </VRText>
            )
        },
        {
            header: 'Identifiers',
            component: <Identifiers identifiers={identifiers} />
        }
    ];

    const isJustYear =
        released &&
        released.indexOf('/') === -1 &&
        released.indexOf('-') === -1;

    const releasedDate = isJustYear
        ? released
        : new Date(released).toLocaleDateString();

    const [{ name: artist }] = artists;

    return (
        <>
            <VRContainer
                onRefresh={refetchRelease}
                refreshing={loading}
                startAnimation={!!getRelease || !!error}
            >
                {addToCollectionLoading ||
                isInCollectionLoading ||
                removeFromCollectionLoading ||
                addReleaseLoading ||
                addRatingLoading ? (
                    <VRLoading />
                ) : null}
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
                                    in_collection: isInCollection,
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
                    >{`Released: ${releasedDate}`}</VRText>

                    {isInCollection ? (
                        <>
                            <View style={styles.washedOnContainer}>
                                <VRText styleOverride={styles.washedOnText}>
                                    Washed on:
                                </VRText>
                                <Pressable
                                    onPress={() => setCalendarModalOpen(true)}
                                >
                                    <VRText color={colors.primary}>
                                        {washedOn || 'Never'}
                                    </VRText>
                                </Pressable>
                            </View>
                            <Pressable onPress={removeFromCollection}>
                                <VRText>Remove from collection</VRText>
                            </Pressable>
                        </>
                    ) : (
                        <>
                            <Pressable onPress={() => setFolderModalOpen(true)}>
                                <VRText>Add to Collection</VRText>
                            </Pressable>
                            <VRModal
                                modalOpen={folderModalOpen}
                                setModalOpen={setFolderModalOpen}
                                title="Add To Collection"
                            >
                                <FolderModalContent
                                    toggleFolderModal={toggleFolderModal}
                                    folders={foldersWithoutAll}
                                    setFolder={addToCollection}
                                />
                            </VRModal>
                        </>
                    )}
                    <VRCalendarModal
                        setModalOpen={setCalendarModalOpen}
                        modalOpen={calendarModalOpen}
                        loading={washedOnLoading}
                        onDatePress={async (date) => {
                            const washedOnResponse = await addWashedOn({
                                variables: {
                                    releaseId: +id,
                                    washedOn: date,
                                    title,
                                    artist: artists[0].name
                                }
                            });

                            if (washedOnResponse?.data) {
                                setWashedOn(date);
                            }
                            setCalendarModalOpen(false);
                        }}
                    />
                    {!isFromVersions ? (
                        <VRPressable
                            trackID="release_screen-see_all_versions"
                            onPress={() => {
                                navigation.navigate({
                                    name: 'Versions',
                                    params: {
                                        masterId: master_id,
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
                    ) : null}

                    <VRRateModal
                        onPress={submit}
                        modalOpen={rateModalOpen}
                        setModalOpen={setRateModalOpen}
                        subTitle={`${artist} - ${title}`}
                    />
                    <VRSegmented components={segmentedData} />

                    <VRWebViewModal
                        uri={uri}
                        discogsReviewsModalOpen={discogsReviewsModalOpen}
                        setDiscogsReviewsModalOpen={setDiscogsReviewsModalOpen}
                    />
                </View>
            </VRContainer>
            <VRFooter styleOverride={{ paddingBottom: 0 }}>
                <VRButton
                    trackID="release_screen-rate"
                    title="Rate this release"
                    onPress={() => setRateModalOpen(true)}
                />
            </VRFooter>
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
    washedOnContainer: {
        flexDirection: 'row',
        paddingVertical: 5
    },
    washedOnText: {
        marginRight: 6
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

export default Release;
