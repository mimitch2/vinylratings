import React, { Dispatch, SetStateAction } from 'react';
import { Pressable, StyleSheet, ScrollView } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { globalStyles } from 'constants/index';
import { VRText } from 'components';
import { Folder, VoidFuncNoParams } from 'types';

const FolderModalContent = ({
    toggleFolderModal,
    folders,
    folder = null,
    setFolder
}: {
    toggleFolderModal: VoidFuncNoParams;
    folders: Folder[];
    folder?: Folder | null;
    setFolder: Dispatch<SetStateAction<Folder>> | ((value: Folder) => void);
}) => {
    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Layout style={styles.list}>
                {folders.map((folderItem: Folder) => {
                    const isSelected = folderItem.id === folder?.id;
                    const color = isSelected ? 'primary' : 'basic';

                    return (
                        <Pressable
                            key={folderItem.id}
                            onPress={() => {
                                setFolder(folderItem);
                                toggleFolderModal();
                            }}
                            style={styles.listItem}
                        >
                            <VRText
                                styleOverride={styles.listItemText}
                                status={color}
                            >
                                {`${folderItem.name} (${folderItem.count})`}
                            </VRText>
                        </Pressable>
                    );
                })}
            </Layout>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 60,
        width: '100%',
        alignItems: 'center'
    },
    list: {
        paddingVertical: 20
    },
    listItem: {
        paddingVertical: 5,
        ...globalStyles.rowAlignCenter,
        justifyContent: 'flex-end'
    },
    listItemText: {
        marginRight: 10,
        fontSize: 18
    }
});

export default FolderModalContent;
