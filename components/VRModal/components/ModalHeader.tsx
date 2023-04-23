import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { VRIcon, VRText, VRDivider } from 'components';
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
        <Layout style={styles.wrapper}>
            <Layout style={styles.view}>
                {title && <VRText fontType="h4">{title}</VRText>}
                {subTitle && <VRText fontType="h5">{subTitle}</VRText>}
                <Pressable
                    style={styles.modalClose}
                    onPress={onClosePress}
                    testID="modal-header-close"
                >
                    <VRIcon type="close" />
                </Pressable>
            </Layout>
            {title && <VRDivider />}
        </Layout>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%'
    },
    view: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 20
    },
    modalClose: {
        position: 'absolute',
        top: 22,
        right: 22
    }
});

export default ModalHeader;
