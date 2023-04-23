import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { VRIcon, VRText, VRPressable, VRDivider } from 'components';
import { Folder, VoidFuncNoParams } from 'types';
import { globalStyles } from 'constants/index';

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
    return (
        <Layout>
            <Layout style={styles.view}>
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
                        styleOverride={{
                            ...globalStyles.centerCenter,
                            left: -10
                        }}
                    >
                        <VRIcon type="folder" />
                        <VRText>{folder.name}</VRText>
                    </VRPressable>
                )}

                <VRPressable
                    onPress={onSortOrderPress}
                    trackID="sort_order-toggle"
                    testID="sort-order"
                >
                    <VRIcon type={sortOrder} />
                </VRPressable>
            </Layout>
            <VRDivider />
        </Layout>
    );
};

const styles = StyleSheet.create({
    view: {
        paddingBottom: 10,
        marginTop: -10,
        ...globalStyles.rowAlignCenter,
        justifyContent: 'space-between'
    }
});

export default ModalControlBar;
