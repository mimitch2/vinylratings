import React, { useState, Dispatch, SetStateAction } from 'react';

import {
    FolderModalContent,
    ModalControlBar,
    SortModalContent
} from './components';
import { VRModal } from 'components';
import { Folder, SortOrder } from 'types';

const VRReleaseOptionsModal = ({
    sort,
    setSort,
    sortOrder,
    setSortOrder,
    folders,
    folder,
    setFolder,
    isWantList = false
}: {
    sort: string;
    setSort: Dispatch<SetStateAction<string>>;
    sortOrder: SortOrder;
    setSortOrder: Dispatch<SetStateAction<SortOrder>>;
    folders?: Folder[];
    folder?: Folder;
    setFolder?: Dispatch<SetStateAction<Folder>>;
    isWantList?: boolean;
}) => {
    const [sortModalOpen, setSortModalOpen] = useState(false);
    const [folderModalOpen, setFolderModalOpen] = useState(false);

    const onSortOrderPress = () => {
        const newOrder = sortOrder === 'desc' ? 'asc' : 'desc';

        setSortOrder(newOrder);
    };

    const toggleFolderModal = () => {
        setFolderModalOpen((prevState) => !prevState);
    };

    const toggleSortModal = () => {
        setSortModalOpen((prevState) => !prevState);
    };

    const shouldRenderFolders = folders && folder && setFolder;
    const optionalControlProps = shouldRenderFolders
        ? {
              folder
          }
        : {};

    return (
        <>
            <ModalControlBar
                sort={sort}
                sortOrder={sortOrder}
                toggleSortModal={toggleSortModal}
                onSortOrderPress={onSortOrderPress}
                toggleFolderModal={toggleFolderModal}
                {...optionalControlProps}
            />
            <VRModal
                modalOpen={sortModalOpen}
                setModalOpen={setSortModalOpen}
                title="Sort by"
            >
                <SortModalContent
                    toggleSortModal={toggleSortModal}
                    sort={sort}
                    setSort={setSort}
                    isWantList={isWantList}
                />
            </VRModal>
            {shouldRenderFolders && (
                <VRModal
                    modalOpen={folderModalOpen}
                    setModalOpen={setFolderModalOpen}
                    title="Select folder"
                >
                    <FolderModalContent
                        toggleFolderModal={toggleFolderModal}
                        folders={folders}
                        folder={folder}
                        setFolder={setFolder}
                    />
                </VRModal>
            )}
        </>
    );
};

export default VRReleaseOptionsModal;
