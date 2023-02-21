import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { HEIGHT, globalStyles, Theme } from 'constants/index';
import ModalHeader from './components/ModalHeader';

const VRModal = ({
    children,
    title = '',
    subTitle = '',
    modalOpen,
    setModalOpen,
    animationType = 'slide',
    transparent = true,
    centerContent = true
}: {
    children: React.ReactNode;
    title?: string;
    subTitle?: string;
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
    animationType?: 'slide' | 'fade' | 'none';
    transparent?: boolean;
    centerContent?: boolean;
}) => {
    const { colors }: Theme = useTheme();

    return (
        <Modal
            visible={modalOpen}
            transparent={transparent}
            animationType={animationType}
        >
            <View
                style={
                    centerContent
                        ? {
                              ...styles.modalContent,
                              backgroundColor: colors.background
                          }
                        : {
                              ...centeredStyles.modalContent,
                              backgroundColor: colors.background
                          }
                }
            >
                <ModalHeader
                    title={title}
                    subTitle={subTitle}
                    onClosePress={() => setModalOpen(false)}
                />
                {children}
            </View>
        </Modal>
    );
};

const modalContent = {
    height: HEIGHT,
    marginTop: 30
};

const styles = StyleSheet.create({
    modalContent
});

const centeredStyles = StyleSheet.create({
    modalContent: {
        ...modalContent,
        ...globalStyles.alignCenter
    }
});

export default VRModal;
