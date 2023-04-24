import React, { useState } from 'react';
import { Dimensions, View, StyleSheet, Platform } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, FlashMode } from 'expo-camera';

import { ThemeColors, Theme } from 'styles';
import { VRIcon, VRPressable, VRButton } from 'components';
import { Layout, Modal, Card } from '@ui-kitten/components';
import { Colors } from 'types';
import { HEIGHT, WIDTH } from 'constants/index';

const BoltIcon = ({ torchMode }: { torchMode: boolean }) => {
    return (
        <VRIcon
            type={torchMode ? 'bolt' : 'boltSlash'}
            styleOverride={{
                position: 'absolute',
                right: 4
            }}
            size="sm"
        />
    );
};

const CameraModal = ({
    showCamera,
    setShowCamera,
    onBarCodeRead
}: {
    showCamera: boolean;
    setShowCamera: React.Dispatch<React.SetStateAction<boolean>>;
    onBarCodeRead: (value: { data: string | undefined }) => void;
}) => {
    const [torchMode, setTorchMode] = useState(false);

    const handleReadCode = ({ data }: { data: string | undefined }) => {
        setShowCamera(false);
        onBarCodeRead({ data });
    };

    const onSetTorch = () => {
        setTorchMode((prevState) => !prevState);
    };

    const renderCamera = () => {
        return (
            <Layout style={styles.cameraContainer}>
                <Layout
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <Camera
                        style={{ width: '90%', height: '60%' }}
                        barCodeScannerSettings={{
                            barCodeTypes: [code39, code128, itf14, upc_e, ean13]
                        }}
                        onBarCodeScanned={handleReadCode}
                        flashMode={torchMode ? FlashMode.torch : FlashMode.off}
                    />
                </Layout>
            </Layout>
        );
    };

    const {
        Constants: {
            BarCodeType: { code39, code128, itf14, upc_e, ean13 }
        }
    } = BarCodeScanner;

    return (
        <Modal
            visible={showCamera}
            backdropStyle={styles.backdrop}
            animationType="fade"
        >
            <Layout>
                <Layout style={styles.cameraContainer}>
                    {Platform.OS === 'android' && renderCamera()}
                    <Layout />
                    {Platform.OS !== 'android' && renderCamera()}
                </Layout>
                <Layout style={styles.bottomButtons}>
                    <VRButton
                        size="small"
                        title="Cancel"
                        onPress={() => {
                            setTorchMode(false);
                            setShowCamera(false);
                        }}
                        trackID="barcode-scanner--cancel"
                        containerStyle={{ marginRight: 20 }}
                        stacked={false}
                    />
                    <VRButton
                        size="small"
                        title="light"
                        onPress={onSetTorch}
                        trackID="barcode-scanner--turn-on-flashlight"
                        accessoryRight={<BoltIcon torchMode={torchMode} />}
                        variant="basic"
                        stacked={false}
                    />
                </Layout>
            </Layout>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: colors.darkGrey,
        // paddingTop: 100
        // height: HEIGHT / 4,
        // width: WIDTH
    },
    cameraContainer: {
        height: HEIGHT / 2,
        width: WIDTH / 1.1
        // ...Platform.select({
        //     android: {
        //         position: 'absolute',
        //         top: 0,
        //         left: 0
        //     },
        //     default: {
        //         // flex: 1
        //     }
        // })
    },
    bottomButtons: {
        // width: '100%',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backdrop: {
        backgroundColor: 'rgba(100, 100, 100, 0.5)'
    }
});

export default CameraModal;
