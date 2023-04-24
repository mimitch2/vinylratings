import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Platform, Animated, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, FlashMode } from 'expo-camera';

import { VRIcon, VRPressable } from 'components';
import { Layout, Modal, Card } from '@ui-kitten/components';
import { HEIGHT, WIDTH } from 'constants/index';
import { toUpperFirst } from 'helpers';

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
    const [toValue, setToValue] = useState(0);

    const scanAnimation = useRef(new Animated.Value(15)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scanAnimation, {
                    toValue: toValue - 15,
                    duration: 2500,
                    useNativeDriver: true,
                    easing: (value) => {
                        return value;
                    }
                })
            ])
        ).start();
    }, [scanAnimation, toValue]);

    const handleReadCode = ({ data }: { data: string | undefined }) => {
        setShowCamera(false);
        onBarCodeRead({ data });
    };

    const onSetTorch = () => {
        setTorchMode((prevState) => !prevState);
    };

    const renderCamera = () => {
        return (
            <Layout
                style={styles.cameraContainer}
                onLayout={(event) => {
                    const { width } = event.nativeEvent.layout;

                    setToValue(width);
                }}
            >
                <Camera
                    style={{
                        width: '100%',
                        height: '77%'
                    }}
                    barCodeScannerSettings={{
                        barCodeTypes: [code39, code128, itf14, upc_e, ean13]
                    }}
                    onBarCodeScanned={handleReadCode}
                    flashMode={torchMode ? FlashMode.torch : FlashMode.off}
                />
                <Animated.View
                    style={{
                        position: 'absolute',
                        height: '55%',
                        width: 0.4,
                        left: 0,
                        transform: [{ translateX: scanAnimation }],
                        backgroundColor: 'rgba(255, 255, 255, 0.5)'
                    }}
                />
                {[
                    ['top', 'left'],
                    ['top', 'right'],
                    ['bottom', 'left'],
                    ['bottom', 'right']
                ].map(([vert, horiz]) => {
                    return (
                        <View
                            key={`${vert}-${horiz}`}
                            style={{
                                position: 'absolute',
                                [horiz]: 15,
                                [vert]: 40,
                                height: 30,
                                width: 30,
                                [`border${toUpperFirst(vert)}Color`]:
                                    'rgba(255, 255, 255, 0.5)',
                                [`border${toUpperFirst(horiz)}Color`]:
                                    'rgba(255, 255, 255, 0.5)',
                                borderWidth: 1
                            }}
                        />
                    );
                })}
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
            <Card style={styles.container}>
                <Layout>
                    {Platform.OS === 'android' && renderCamera()}
                    <Layout />
                    {Platform.OS !== 'android' && renderCamera()}
                </Layout>
                <Layout style={styles.bottomButtons}>
                    <VRPressable
                        onPress={onSetTorch}
                        trackID={`barcode-scanner--flashlight-${torchMode}`}
                    >
                        <VRIcon
                            type={torchMode ? 'flashlight' : 'flashlightSlash'}
                        />
                    </VRPressable>
                    <VRPressable
                        onPress={() => {
                            setShowCamera(false);
                        }}
                        trackID="barcode-scanner--close"
                    >
                        <VRIcon type="close" />
                    </VRPressable>
                </Layout>
            </Card>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: colors.darkGrey,
        // paddingTop: 100
        height: HEIGHT / 2,
        width: WIDTH / 1.1,
        justifyContent: 'space-between'
    },
    cameraContainer: {
        justifyContent: 'center',
        alignItems: 'center'
        // height: HEIGHT / 1.7,
        // width: WIDTH / 1.1
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
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backdrop: {
        backgroundColor: 'rgba(100, 100, 100, 0.5)'
    }
});

export default CameraModal;
