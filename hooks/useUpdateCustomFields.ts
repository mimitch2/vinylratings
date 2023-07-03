import { gql, useMutation } from '@apollo/client';

import { CopyStateValue, SubmitUpdateCopyArgs } from 'types';
import { useUpdateInstanceFolder } from 'hooks';
export type UpdateCustomFieldData = {
    success: boolean;
};

export type UpdateCustomFieldVariables = {
    values: CopyStateValue[];
    releaseId: number;
    instanceId: number;
    folderId: number;
};

const UPDATE_CUSTOM_FIELD = gql`
    mutation UpdateCustomField(
        $values: [CustomFieldValuesInput!]!
        $releaseId: Int!
        $folderId: Int!
        $instanceId: Int!
    ) {
        updateCustomField(
            values: $values
            releaseId: $releaseId
            folderId: $folderId
            instanceId: $instanceId
        ) {
            success
        }
    }
`;

export const useUpdateCustomFields = () => {
    const [updateCustomFields, { data, loading, error }] = useMutation<
        UpdateCustomFieldData,
        UpdateCustomFieldVariables
    >(UPDATE_CUSTOM_FIELD);
    const {
        updateInstanceFolder,
        loading: updateInstanceFolderLoading,
        error: updateInstanceFolderError
    } = useUpdateInstanceFolder();

    const submitUpdateCopy = async ({
        copyState,
        folderId,
        instanceId,
        releaseId,
        newFolderId
    }: SubmitUpdateCopyArgs) => {
        const promises = [];
        const values = Object.values(copyState).map((field) => ({
            fieldId: field.fieldId,
            value: field.value
        }));

        if (values.length) {
            promises.push(
                updateCustomFields({
                    variables: {
                        folderId: +folderId,
                        instanceId: +instanceId,
                        releaseId: +releaseId,
                        values
                    },
                    refetchQueries: !newFolderId
                        ? ['IsInCollection']
                        : undefined
                })
            );
        }

        if (newFolderId) {
            promises.push(
                updateInstanceFolder({
                    variables: {
                        instanceId: +instanceId,
                        folderId: +newFolderId,
                        releaseId: +releaseId,
                        newFolderId: +newFolderId
                    },
                    refetchQueries: ['IsInCollection']
                })
            );
        }

        if (!promises.length) {
            return;
        }

        await Promise.all(promises);
    };

    return {
        submitUpdateCopy,
        data,
        loading: updateInstanceFolderLoading || loading,
        error
    };
};
