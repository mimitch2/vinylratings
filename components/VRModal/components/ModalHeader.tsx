import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { VRIcon, VRText } from 'components';
import { COLORS } from 'constants/index';
import { VoidFunc } from 'types';

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
        <Layout style={[styles.view, { borderBottomWidth: title ? 0.5 : 0 }]}>
            {title && <VRText fontType="h4">{title}</VRText>}
            {subTitle && (
                <VRText styleOverride={{ fontSize: 18 }}>{subTitle}</VRText>
            )}
            <Pressable
                style={styles.modalClose}
                onPress={onClosePress}
                testID="modal-header-close"
            >
                <VRIcon type="close" />
            </Pressable>
        </Layout>
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
