import { gql, useMutation } from '@apollo/client';
import { CopyStateValue } from 'types';

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

    return {
        updateCustomFields,
        data,
        loading,
        error
    };
};
