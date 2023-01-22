import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { VRIcon, VRText, VRPressable } from '../../';
import { Folder, VoidFuncNoParams } from '../../../types';
import { globalStyles, ThemeColors, Theme } from '../../../constants';

const ModalControlBar = ({
    folder,
    onSortOrderPress,
    sort,
    sortOrder,
    toggleFolderModal,
    toggleSortModal
}: {
    folder?: Folder;
    onSortOrderPress: VoidFuncNoParams;
    sort: string;
    sortOrder: 'asc' | 'desc';
    toggleFolderModal: VoidFuncNoParams;
    toggleSortModal: VoidFuncNoParams;
}) => {
    const { colors }: Theme = useTheme();

    return (
        <View style={styles(colors).view}>
            <VRPressable
                trackID="sort_modal-toggle"
                testID="sort-toggle"
                onPress={toggleSortModal}
                styleOverride={globalStyles.centerCenter}
            >
                <VRIcon type="sort" />
                <VRText fontStyle="italic">{`by ${sort}`}</VRText>
            </VRPressable>
            {folder && (
                <VRPressable
                    testID="folder-toggle"
                    trackID="folder_modal-toggle"
                    onPress={toggleFolderModal}
                    styleOverride={{ ...globalStyles.centerCenter, left: -10 }}
                >
                    <VRIcon type="folder" />
                    <VRText fontStyle="italic">{folder.name}</VRText>
                </VRPressable>
            )}

            <VRPressable
                onPress={onSortOrderPress}
                trackID="sort_order-toggle"
                testID="sort-order"
            >
                <VRIcon type={sortOrder} />
            </VRPressable>
        </View>
    );
};

const styles = (colors: ThemeColors) =>
    StyleSheet.create({
        view: {
            borderBottomWidth: 0.5,
            borderBottomColor: colors.primaryFaded,
            paddingBottom: 10,
            marginTop: -10,
            ...globalStyles.rowAlignCenter,
            justifyContent: 'space-between'
        }
    });

export default ModalControlBar;
