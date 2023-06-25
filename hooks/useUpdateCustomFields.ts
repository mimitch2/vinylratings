import { gql, useMutation } from '@apollo/client';

import { AddOrUpdateCopyArgs } from 'types';

type UpdateCustomFieldData = {
    success: boolean;
};

type UpdateCustomFieldVariables = {
    releaseId: number;
    instanceId: number;
    folderId: number;
    fieldId: number;
    value: string;
};

const UPDATE_CUSTOM_FIELD = gql`
    mutation UpdateCustomField(
        $releaseId: Int!
        $fieldId: Int!
        $value: String!
        $folderId: Int!
        $instanceId: Int!
    ) {
        updateCustomField(
            releaseId: $releaseId
            fieldId: $fieldId
            value: $value
            folderId: $folderId
            instanceId: $instanceId
        ) {
            success
        }
    }
`;

export const useUpdateCustomFields = () => {
    const [updateCustomField, { data, loading, error }] = useMutation<
        UpdateCustomFieldData,
        UpdateCustomFieldVariables
    >(UPDATE_CUSTOM_FIELD);

    const updateCustomFields = async ({
        customFieldsValues,
        releaseId,
        instanceId,
        folderId
    }: AddOrUpdateCopyArgs & { instanceId: number }) => {
        if (customFieldsValues) {
            const success = await Promise.all(
                customFieldsValues.map(async ({ fieldId, value }) => {
                    await updateCustomField({
                        variables: {
                            releaseId: +releaseId,
                            fieldId: +fieldId,
                            value: value,
                            folderId: +folderId,
                            instanceId
                        }
                    });
                })
            );
            return success;
        }
    };

    return {
        updateCustomFields,
        data,
        loading,
        error
    };
};
