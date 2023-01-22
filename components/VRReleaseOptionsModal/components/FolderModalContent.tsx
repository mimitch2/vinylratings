import React, { Dispatch, SetStateAction } from 'react';
import { Pressable, StyleSheet, ScrollView, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { globalStyles, Theme } from '../../../constants';
import { VRText } from '../../';
import { Folder, VoidFuncNoParams } from '../../../types';

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
    const { colors }: Theme = useTheme();

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.list}>
                {folders.map((folderItem: Folder) => {
                    const isSelected = folderItem.id === folder?.id;
                    const color = isSelected ? colors.primary : colors.text;
                    const fontWeight = isSelected ? 'bold' : 'normal';

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
                                size={20}
                                color={color}
                                fontWeight={fontWeight}
                            >
                                {`${folderItem.name} (${folderItem.count})`}
                            </VRText>
                        </Pressable>
                    );
                })}
            </View>
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
        marginRight: 10
    }
});

export default FolderModalContent;
