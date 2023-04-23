import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Layout } from '@ui-kitten/components';

import { HEIGHT, globalStyles } from 'constants/index';
import ModalHeader from './components/ModalHeader';

const VRModal = ({
    children,
    title = '',
    subTitle = '',
    modalOpen,
    setModalOpen,
    animationType = 'slide',
    centerContent = true
}: {
    children: React.ReactNode;
    title?: string;
    subTitle?: string;
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
    animationType?: 'slide' | 'fade' | 'none';
    centerContent?: boolean;
}) => {
    const dynamicStyles = useMemo(
        () => (centerContent ? { ...globalStyles.alignCenter } : {}),
        [centerContent]
    );

    return (
        <Modal
            visible={modalOpen}
            animationType={animationType}
            shouldUseContainer={false}
            style={{ flex: 1 }}
        >
            <Layout style={[styles.modalContent, dynamicStyles]}>
                <ModalHeader
                    title={title}
                    subTitle={subTitle}
                    onClosePress={() => setModalOpen(false)}
                />
                {children}
            </Layout>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        height: HEIGHT,
        marginTop: 30
    }
});

export default VRModal;
