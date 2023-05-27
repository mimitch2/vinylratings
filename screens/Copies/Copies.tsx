import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';

import { CopyCard } from './components';
import { VRText, VRContainer } from 'components';
import {
    GET_RELEASE,
    ADD_RELEASE,
    ADD_TO_COLLECTION,
    REMOVE_FROM_COLLECTION,
    ADD_RATING,
    ADD_WASHED_ON,
    GET_CUSTOM_FIELDS
} from 'screens/Release/releaseQueries';
import { client } from '../../ApolloProviderWrapper';

import {
    useIsInCollection,
    useGetFolders,
    IS_IN_COLLECTION,
    useIsLoading
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

    const [
        removeFromCollectionMutation,
        { loading: removeFromCollectionLoading }
    ] = useMutation(REMOVE_FROM_COLLECTION);

    const [addToCollectionMutation, { loading: addToCollectionLoading }] =
        useMutation(ADD_TO_COLLECTION);

    const [addWashedOn, { loading: washedOnLoading }] = useMutation(
        ADD_WASHED_ON
        // {
        //     refetchQueries: [{ query: GET_RELEASE }, 'GetRelease']
        // }
    );

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
            // setFolderModalOpen(false);
        }
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

    return (
        <VRContainer styleOverride={{ flex: 1, height: '100%' }} startAnimation>
            <VRText>Copies</VRText>
            <CopyCard />
        </VRContainer>
    );
};

export default Copies;
