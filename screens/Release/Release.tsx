import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';

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
    VRContainer,
    VRDivider,
    VRError,
    VRFooter,
    VRIcon,
    VRLoading,
    VRModal,
    VRPressable,
    VRRateModal,
    VRRatings,
    VRReleaseInfoCommon,
    VRSegmented,
    VRText,
    VRTrackList,
    VRWebViewModal,
    VRCalendarModal
} from 'components';
import type { DiscogsRelease, Folder, Nav, RatingPayload } from 'types';
import { getReleaseTags } from 'helpers';
import { Identifiers } from './components';
import { useIsInCollection, useGetFolders, IS_IN_COLLECTION } from 'hooks';
import { client } from '../../ApolloProviderWrapper';
import { Layout } from '@ui-kitten/components';

type Params = {
    id: string;
    inWantList: boolean;
    isFromVersions: boolean;
};

export type Route = {
    params: Params;
};

const Release = ({ route, navigation }: { route: Route; navigation: Nav }) => {
    const [segmentedIdx, setSegmentedIdx] = useState(0);
    const [washedOn, setWashedOn] = useState('');
    const [calendarModalOpen, setCalendarModalOpen] = useState(false);
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
            label: 'Ratings',
            component: (
                <VRRatings
                    discogsRating={community.rating}
                    vinylRatingsRelease={vinylRatingsRelease}
                    setDiscogsReviewsModalOpen={setDiscogsReviewsModalOpen}
                />
            )
        },
        {
            label: 'Tracklist',
            component: <VRTrackList tracklist={tracklist} />
        },
        {
            label: 'Notes',
            component: (
                <VRText styleOverride={{ marginTop: 10, minHeight: 200 }}>
                    {releaseNotes}
                </VRText>
            )
        },
        {
            label: 'Identifiers',
            component: <Identifiers identifiers={identifiers} />
        }
    ];

    const getReleaseDate = () => {
        const isJustYear =
            released &&
            released.indexOf('/') === -1 &&
            released.indexOf('-') === -1;

        if (isJustYear) {
            return released;
        }

        const newDate = new Date(released).toLocaleDateString();

        if (newDate === 'Invalid Date') {
            return getRelease?.year?.toString() ?? 'Unknown';
        }

        return newDate;
    };

    const folderName =
        folders?.find((folder) => {
            return +releases?.[0]?.folder_id === folder?.id ?? false;
        })?.name ?? 'Unknown';

    const [{ name: artist }] = artists;
    const isLoading =
        addToCollectionLoading ||
        isInCollectionLoading ||
        removeFromCollectionLoading ||
        addReleaseLoading ||
        addRatingLoading;

    return (
        <>
            <VRContainer
                onRefresh={refetchRelease}
                refreshing={loading}
                startAnimation={!!getRelease || !!error}
            >
                {isLoading ? <VRLoading /> : null}
                <Layout style={{ paddingBottom: 20, marginTop: 5 }}>
                    <VRReleaseInfoCommon
                        images={images}
                        tags={tags}
                        isInCollection={isInCollection}
                        inWantList={inWantList}
                        title={title}
                        artist={artist}
                        releasedDate={getReleaseDate()}
                    />
                    {isInCollection ? (
                        <VRText>Folder: {folderName}</VRText>
                    ) : null}

                    <Layout style={styles.buttonRow}>
                        <VRButton
                            title={`${
                                isInCollection ? 'Remove from' : 'Add to'
                            } collection`}
                            onPress={
                                isInCollection
                                    ? removeFromCollection
                                    : () => setFolderModalOpen(true)
                            }
                            trackID="release_screen-remove_from_collection"
                            size="tiny"
                            variant="basic"
                            stacked={false}
                        />
                        {isInCollection ? (
                            <VRButton
                                title={
                                    washedOn
                                        ? `Washed on: ${washedOn}`
                                        : 'Set washed on date'
                                }
                                onPress={() => setCalendarModalOpen(true)}
                                trackID="release_screen-wash_now"
                                size="tiny"
                                variant="basic"
                                stacked={false}
                                containerStyle={{
                                    marginLeft: 10
                                }}
                            />
                        ) : null}
                    </Layout>

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
                            <VRDivider />
                            <Layout style={[styles.versions]}>
                                <VRText>See all pressings</VRText>
                                <VRIcon type="chevronRight" size="sm" />
                            </Layout>
                            <VRDivider />
                        </VRPressable>
                    ) : null}

                    <VRRateModal
                        onPress={submit}
                        modalOpen={rateModalOpen}
                        setModalOpen={setRateModalOpen}
                        subTitle={`${artist} - ${title}`}
                    />
                    <VRSegmented data={segmentedData} />

                    <VRWebViewModal
                        uri={uri}
                        discogsReviewsModalOpen={discogsReviewsModalOpen}
                        setDiscogsReviewsModalOpen={setDiscogsReviewsModalOpen}
                    />
                </Layout>
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
        left: -20,
        top: -20
    },
    title: {
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    },
    buttonRow: {
        flexDirection: 'row',
        paddingVertical: 20,
        justifyContent: 'space-between'
    },
    washedOnText: {
        marginRight: 6
    },
    versions: {
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default Release;
