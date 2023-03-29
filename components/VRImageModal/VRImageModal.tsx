import React from 'react';
import {
    View,
    Pressable,
    StyleSheet,
    Modal,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import { VRIcon } from 'components';

import { COLORS } from 'constants/index';
import { DiscogsImage } from 'types';
import ImageViewer from 'react-native-image-zoom-viewer';

const VRImageModal = ({
    images,
    modalOpen,
    setModalOpen
}: {
    images: DiscogsImage[];
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
}) => {
    const mappedImages = images.map((image) => {
        return {
            url: image.resource_url,
            height: image.height,
            width: image.width
        };
    });

    return (
        <Modal visible={modalOpen} animationType="slide">
            <View style={styles.close}>
                <Pressable
                    testID="close-button"
                    onPress={() => {
                        setModalOpen(false);
                        StatusBar.setHidden(false);
                    }}
                >
                    <VRIcon type="close" size="lg" color={COLORS.background} />
                </Pressable>
            </View>
            <ImageViewer
                imageUrls={mappedImages}
                useNativeDriver
                saveToLocalByLongPress={false}
                loadingRender={() => <ActivityIndicator />}
            />
        </Modal>
    );
};

const styles = StyleSheet.create({
    close: {
        position: 'absolute',
        zIndex: 2,
        top: 30,
        right: 20,
        backgroundColor: 'transparent'
    }
});

export default VRImageModal;
