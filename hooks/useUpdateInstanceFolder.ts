import { gql, useMutation } from '@apollo/client';

type UpdateInstanceFolderData = {
    success: boolean;
};

type UpdateInstanceFolderVariables = {
    releaseId: number;
    instanceId: number;
    fieldId: number;
    value: string;
};

const UPDATE_INSTANCE_FOLDER = gql`
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

export const useUpdateInstanceFolder = () => {
    const [updateInstanceFolder, { data, loading, error }] = useMutation<
        UpdateInstanceFolderData,
        UpdateInstanceFolderVariables
    >(UPDATE_INSTANCE_FOLDER);

    return {
        updateInstanceFolder,
        data,
        loading,
        error
    };
};
