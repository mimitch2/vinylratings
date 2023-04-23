import React, { Dispatch, SetStateAction } from 'react';
import { Pressable, StyleSheet, ScrollView, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Layout } from '@ui-kitten/components';

import { globalStyles, Theme } from 'constants/index';
import { VRText } from 'components';
import { Colors, Folder, VoidFuncNoParams } from 'types';
import { useColorTheme } from 'hooks';

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
    // const { colors }: Theme = useTheme();

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Layout style={styles.list}>
                {folders.map((folderItem: Folder) => {
                    const isSelected = folderItem.id === folder?.id;
                    const color = isSelected ? Colors.primary : Colors.text;

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
                                color={color}
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
