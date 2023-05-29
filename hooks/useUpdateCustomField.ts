import { gql, useMutation } from '@apollo/client';

interface UpdateCustomFieldData {
    success: boolean;
}

interface UpdateCustomFieldVariables {
    releaseId: number;
    instanceId: number;
    folderId: number;
    fieldId: number;
    value: string;
}

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

export const useUpdateCustomField = () => {
    const [updateCustomField, { data, loading, error }] =
        useMutation(UPDATE_CUSTOM_FIELD);

    return {
        updateCustomField,
        data,
        loading,
        error
    };
};
