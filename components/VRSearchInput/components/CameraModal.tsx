import React, { useState } from 'react';
import { Dimensions, Modal, View, StyleSheet, Platform } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { ThemeColors, Theme } from 'styles';
import { VRIcon, VRPressable } from 'components';
import { useTheme } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

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
    const { colors }: Theme = useTheme();

    const handleReadCode = ({ data }: { data: string | undefined }) => {
        setShowCamera(false);
        onBarCodeRead({ data });
    };

    const onSetTorch = () => {
        setTorchMode((prevState) => !prevState);
    };

    const renderCamera = () => {
        return (
            <View style={styles(colors).cameraContainer}>
                <BarCodeScanner
                    onBarCodeScanned={handleReadCode}
                    // style={{ width: '100%', height: '20%' }}
                    barCodeTypes={[code39, code128, itf14, upc_e, ean13]}
                >
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            width: '100%',
                            backgroundColor: 'transparent'
                        }}
                    >
                        <View
                            style={{
                                borderTopWidth: 1,
                                borderRightWidth: 1,
                                borderColor: 'blue',
                                height: 80,
                                width: 80,
                                backgroundColor: 'transparent'
                            }}
                        />
                    </View>
                </BarCodeScanner>
            </View>
        );
    };

    const {
        Constants: {
            BarCodeType: { code39, code128, itf14, upc_e, ean13 }
        }
    } = BarCodeScanner;

    return (
        <Modal animationType="slide" visible={showCamera}>
            <View style={styles(colors).container}>
                {Platform.OS === 'android' && renderCamera()}
                <View />
                {Platform.OS !== 'android' && renderCamera()}
                <View style={styles(colors).bottomButtons}>
                    <VRPressable
                        trackID="camera_modal-enable_torch"
                        onPress={onSetTorch}
                    >
                        <VRIcon
                            type="flashlight"
                            color={torchMode ? colors.primary : colors.grey}
                            size="xlg"
                        />
                    </VRPressable>
                    <VRPressable
                        trackID="camera_modal-close_modal"
                        onPress={() => setShowCamera(false)}
                    >
                        <VRIcon type="close" color={colors.grey} size="xlg" />
                    </VRPressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.darkGrey,
            paddingTop: 100
        },
        cameraContainer: {
            ...Platform.select({
                android: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width,
                    height
                },
                default: {
                    flex: 1,
                    borderColor: colors.primary,
                    borderWidth: 5
                }
            })
        },
        bottomButtons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 60
        }
    });

export default CameraModal;
