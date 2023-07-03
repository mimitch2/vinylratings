import React, { useState, useContext } from 'react';
import { Alert, BackHandler } from 'react-native';
import { useMutation } from '@apollo/client';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';

import { CopyCard } from './components';
import { VRText, VRContainer, VRLoading, VRButton, VRFooter } from 'components';
import {
    GET_RELEASE,
    ADD_RELEASE,
    ADD_TO_COLLECTION,
    REMOVE_FROM_COLLECTION,
    ADD_RATING,
    ADD_WASHED_ON,
    GET_CUSTOM_FIELDS
} from 'screens/Release/releaseQueries';
import { CollectionInstance, Folder } from 'types';
import { client } from '../../ApolloProviderWrapper';

import {
    useIsInCollection,
    useGetFolders,
    IS_IN_COLLECTION,
    useCustomFields
    // useAddCopy
} from 'hooks';

type Params = {
    id: string;
};

export type Route = {
    params: Params;
};

const Copies = ({ route }: { route: Route }) => {
    const {
        params: { id }
    } = route;
    const { releases, isInCollectionLoading, refetchIsInCollection } =
        useIsInCollection({
            releaseId: +id
        });

    const { folders, foldersLoading } = useGetFolders();
    const foldersWithoutAll = folders.slice(1);

    const {
        data: customFields,
        loading: customFieldsLoading,
        error: customFieldsError
    } = useCustomFields();

    const [
        removeFromCollectionMutation,
        { loading: removeFromCollectionLoading }
    ] = useMutation(REMOVE_FROM_COLLECTION);

    const [addToCollectionMutation, { loading: addToCollectionLoading }] =
        useMutation(ADD_TO_COLLECTION);

    // const { addToCollection } = useAddCopy({
    //     releaseId: +id,
    //     customFieldsValues: [],
    //     folderId: 0
    // });

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

    const removeFromCollection = async ({
        instanceId
    }: {
        instanceId: string;
    }) => {
        try {
            await removeFromCollectionMutation({
                variables: {
                    folderId: +releases[0].folder_id,
                    releaseId: +id,
                    instanceId: +instanceId
                },
                onCompleted: (response) => {
                    if (response?.removeFromCollection?.success) {
                        // optimisticallyUpdateIsInCollection(false);
                        refetchIsInCollection();
                    }
                }
            });
        } catch (err: any) {
            throw new Error(err);
        }
    };

    const handleRemoveFromCollection = ({
        instanceId
    }: {
        instanceId: string;
    }) => {
        Alert.alert('Remove from collection?', '', [
            {
                text: 'Cancel'
            },
            {
                text: 'Yes',
                onPress: () => removeFromCollection({ instanceId })
            }
        ]);
    };

    return (
        <>
            <VRContainer startAnimation>
                <Layout style={{ flex: 1 }}>
                    {isInCollectionLoading ||
                    foldersLoading ||
                    customFieldsLoading ? (
                        <VRLoading />
                    ) : (
                        releases
                            ?.map(
                                (release: CollectionInstance, idx: number) => (
                                    <Layout
                                        key={release.instance_id}
                                        style={{
                                            marginBottom:
                                                idx === releases.length - 1
                                                    ? 15
                                                    : 0
                                        }}
                                    >
                                        <CopyCard
                                            release={release}
                                            removeFromCollection={
                                                handleRemoveFromCollection
                                            }
                                            customFields={customFields}
                                            folders={foldersWithoutAll}
                                        />
                                    </Layout>
                                )
                            )
                            .reverse()
                    )}
                </Layout>
            </VRContainer>

            <VRFooter>
                <VRButton
                    trackID="copies_screen-add_another_copy"
                    title="Add another copy"
                    onPress={() => console.log('pressed')}
                />
            </VRFooter>
        </>
    );
};

export default Copies;
