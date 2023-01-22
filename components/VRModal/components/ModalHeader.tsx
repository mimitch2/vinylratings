import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { VRIcon, VRText } from '../../';
import { COLORS } from '../../../constants';
import { VoidFunc } from '../../../types';

const ModalHeader = ({
    title = '',
    subTitle = '',
    onClosePress
}: {
    title?: string;
    subTitle?: string;
    onClosePress: VoidFunc;
}) => {
    return (
        <View style={[styles.view, { borderBottomWidth: title ? 0.5 : 0 }]}>
            {title && (
                <VRText size={20} fontWeight="bold">
                    {title}
                </VRText>
            )}
            {subTitle && <VRText size={18}>{subTitle}</VRText>}
            <Pressable
                style={styles.modalClose}
                onPress={onClosePress}
                testID="modal-header-close"
            >
                <VRIcon type="close" />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        width: '100%',
        alignItems: 'center',
        borderBottomColor: COLORS.primaryFaded,
        paddingVertical: 20
    },
    modalClose: {
        position: 'absolute',
        top: 22,
        right: 22
    }
});

export default ModalHeader;
