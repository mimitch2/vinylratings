import React from 'react';
import {
    Pressable,
    StyleSheet,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import { VRIcon } from 'components';
import { Modal, Layout } from '@ui-kitten/components';

import { DiscogsImage, Colors } from 'types';
import { useColorTheme } from 'hooks';

const VRImageModal = ({
    images,
    modalOpen,
    setModalOpen
}: {
    images: DiscogsImage[];
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
}) => {
    const backgroundColor = useColorTheme(Colors.background);

    const mappedImages = images.map((image) => {
        return {
            url: image.resource_url,
            height: image.height,
            width: image.width
        };
    });

    return (
        <Modal
            visible={modalOpen}
            animationType="slide"
            style={{ flex: 1 }}
            shouldUseContainer={false}
        >
            <Layout style={styles.close}>
                <Pressable
                    testID="close-button"
                    onPress={() => {
                        setModalOpen(false);
                        StatusBar.setHidden(false);
                    }}
                >
                    <VRIcon type="close" size="lg" />
                </Pressable>
            </Layout>
            <ImageViewer
                imageUrls={mappedImages}
                useNativeDriver
                saveToLocalByLongPress={true}
                loadingRender={() => <ActivityIndicator />}
                backgroundColor={backgroundColor}
            />
        </Modal>
    );
};

const styles = StyleSheet.create({
    close: {
        position: 'absolute',
        zIndex: 2,
        top: 30,
        right: 20
        // backgroundColor: 'transparent'
    }
});

export default VRImageModal;
