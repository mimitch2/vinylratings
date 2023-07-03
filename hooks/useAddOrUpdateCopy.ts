import { useQuery, useMutation, gql } from '@apollo/client';

import { useUpdateCustomFields, useUpdateInstanceFolder } from 'hooks';
import { AddOrUpdateCopyArgs } from 'types';

export const ADD_TO_COLLECTION = gql`
    mutation AddToCollection($releaseId: Int!, $folderId: Int!) {
        addToCollection(releaseId: $releaseId, folderId: $folderId) {
            instance_id
            folder_id
            id
        }
    }
`;

export const useAddOrUpdateCopy = ({
    releaseId,
    customFieldsValues,
    folderId
}: AddOrUpdateCopyArgs) => {
    const {
        updateCustomFields,
        loading: updateCustomFieldsLoading,
        error: updateCustomFieldsError
    } = useUpdateCustomFields();
    const {
        updateInstanceFolder,
        loading: updateInstanceFolderLoading,
        error: updateInstanceFolderError
    } = useUpdateInstanceFolder();

    const [
        addToCollection,
        {
            loading: addToCollectionLoading,
            data: addToCollectionData,
            error: addToCollectionError
        }
    ] = useMutation(ADD_TO_COLLECTION, {
        onCompleted: (data) => {
            console.log('onCompleted', data);

            if (data && customFieldsValues?.length) {
                updateCustomFields({
                    customFieldsValues,
                    releaseId,
                    instanceId: data.addToCollection.instance_id,
                    folderId
                });
            }
        },
        refetchQueries: ['IsInCollection']
    });

    return {
        addToCollection,
        loading:
            addToCollectionLoading ||
            updateCustomFieldsLoading ||
            updateInstanceFolderLoading,
        error:
            addToCollectionError ||
            updateInstanceFolderError ||
            updateCustomFieldsError
    };
};
