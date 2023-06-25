import { useQuery, useMutation, gql } from '@apollo/client';

import { useUpdateCustomFields } from './useUpdateCustomFields';
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

export const useAddCopy = ({
    releaseId,
    customFieldsValues,
    folderId
}: AddOrUpdateCopyArgs) => {
    const {
        updateCustomFields,
        data: updateFieldsData,
        loading: updateFieldsLoading,
        error: updateFieldsError
    } = useUpdateCustomFields();

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
        loading: addToCollectionLoading || updateFieldsLoading,
        error: addToCollectionError || updateFieldsError
    };
};
