import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    AppState,
    Alert,
    Linking,
    Platform
} from 'react-native';
import { check, PERMISSIONS } from 'react-native-permissions';

import { VRInput, VRIcon, VRPressable } from '../';
import { usePlatform } from '../../hooks';
import { runHapticFeedback } from '../../helpers';
import CameraModal from './components/CameraModal';

const VRSearchInput = ({
    runQuery,
    searchTerm,
    setSearchTerm
}: {
    runQuery: any;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}) => {
    const [cameraAuthorized, setCameraAuthorized] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const { isIOS } = usePlatform();

    useEffect(() => {
        const getPermissions = async () => {
            const isCameraAuthorized = await check(
                PERMISSIONS[isIOS ? 'IOS' : 'ANDROID'].CAMERA
            );

            setCameraAuthorized(isCameraAuthorized === 'granted');
        };

        getPermissions();
    }, [isIOS]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const lastCharacter = searchTerm[searchTerm.length - 1];

            if (
                searchTerm.length > 2 &&
                lastCharacter !== ' ' &&
                searchTerm.length > 1 &&
                searchTerm[searchTerm.length - 2]
            ) {
                runQuery({ variables: { search: searchTerm } });
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, runQuery]);

    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            (nextAppState) => {
                if (nextAppState === 'background' && showCamera) {
                    setShowCamera(false);
                }
            }
        );

        return () => {
            subscription.remove();
        };
    }, [showCamera]);

    const handleBarcodePress = () => {
        if (cameraAuthorized) {
            return setShowCamera(true);
        }

        Alert.alert(
            'VinylRatings needs access to your camera.',
            'Tap the Settings button to grant permission.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Settings',
                    onPress: () => Linking.openSettings()
                }
            ]
        );
    };

    const handleBarCodeRead = (barcode: string | number) => {
        setSearchTerm(barcode.toString());
        runHapticFeedback();
    };

    return (
        <View>
            <VRInput
                handleTextChange={(value) => setSearchTerm(value)}
                value={searchTerm}
                placeholder="Search"
            />
            {searchTerm.length ? (
                <VRPressable
                    onPress={() => setSearchTerm('')}
                    trackID="search_screen-clear_search"
                    styleOverride={styles.icon}
                >
                    <VRIcon type="close" size="sm" />
                </VRPressable>
            ) : (
                <VRPressable
                    onPress={handleBarcodePress}
                    trackID="search_screen-open_camera"
                    styleOverride={styles.icon}
                >
                    <VRIcon type="barcode" size="sm" />
                </VRPressable>
            )}
            <CameraModal
                showCamera={showCamera}
                setShowCamera={setShowCamera}
                onBarCodeRead={handleBarCodeRead}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        right: 5,
        ...Platform.select({
            ios: {
                top: 5
            },
            android: {
                top: 6
            }
        })
    }
});

export default VRSearchInput;
