import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { HEIGHT, MODAL_HEIGHT_OFFSET } from '../../constants';
import { globalStyles, ThemeColors, Theme } from '../../constants';
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

    let style = styles(colors).modalContent;

    if (centerContent) {
        style = { ...style, ...globalStyles.alignCenter };
    }

    return (
        <Modal
            visible={modalOpen}
            transparent={transparent}
            animationType={animationType}
        >
            <View style={style}>
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

const styles = (colors: ThemeColors) =>
    StyleSheet.create({
        modalContent: {
            height: HEIGHT,
            marginTop: 30,
            backgroundColor: colors.background
        }
    });

export default VRModal;
