import { gql, useMutation } from '@apollo/client';

type UpdateInstanceFolderData = {
    success: boolean;
};

type UpdateInstanceFolderVariables = {
    releaseId: number;
    instanceId: number;
    folderId: number;
    newFolderId: number;
};

const UPDATE_INSTANCE_FOLDER = gql`
    mutation UpdateInstanceFolder(
        $releaseId: Int!
        $instanceId: Int!
        $folderId: Int!
        $newFolderId: Int!
    ) {
        updateInstanceFolder(
            releaseId: $releaseId
            instanceId: $instanceId
            folderId: $folderId
            newFolderId: $newFolderId
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
