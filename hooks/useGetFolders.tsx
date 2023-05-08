import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

import { Folder } from 'types';

export const GET_FOLDERS = gql`
    query GetFolders {
        getFolders {
            id
            name
            count
        }
    }
`;

const FOLDER_DEFAULT: Folder = {
    id: 0,
    name: 'All',
    count: 0
};

export const useGetFolders = () => {
    const [folders, setFolders] = useState<[Folder]>([FOLDER_DEFAULT]);
    const [folder, setFolder] = useState<Folder>(FOLDER_DEFAULT);

    const { loading: foldersLoading, error: foldersError } = useQuery(
        GET_FOLDERS,
        {
            onCompleted: (foldersData) => {
                setFolders(foldersData.getFolders);
                setFolder(foldersData.getFolders[0]);
            }
        }
    );

    return {
        folders,
        setFolders,
        folder,
        setFolder,
        foldersLoading,
        foldersError
    };
};
