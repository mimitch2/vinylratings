import React, { useMemo } from 'react';
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

    const dynamicStyles = useMemo(
        () => (centerContent ? { ...globalStyles.alignCenter } : {}),
        [centerContent]
    );

    return (
        <Modal
            visible={modalOpen}
            transparent={transparent}
            animationType={animationType}
        >
            <View
                style={[
                    styles.modalContent,
                    { backgroundColor: colors.background, ...dynamicStyles }
                ]}
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

const styles = StyleSheet.create({
    modalContent: {
        height: HEIGHT,
        marginTop: 30
    }
});

export default VRModal;
