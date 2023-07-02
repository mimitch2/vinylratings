import React, { useEffect, useState } from 'react';
import { StyleSheet, AppState, Alert, Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Layout } from '@ui-kitten/components';

import { VRInput, VRIcon, VRPressable } from 'components';
import { runHapticFeedback } from 'helpers';
import CameraModal from './components/CameraModal';

const InputIcon = ({
    setSearchTerm,
    searchTerm,
    handleBarcodePress
}: {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    searchTerm: string;
    handleBarcodePress: () => void;
}) => {
    return searchTerm.length ? (
        <VRPressable
            onPress={() => setSearchTerm('')}
            trackID="search_screen-clear_search"
        >
            <VRIcon type="close" size="md" />
        </VRPressable>
    ) : (
        <VRPressable
            onPress={handleBarcodePress}
            trackID="search_screen-open_camera"
        >
            <VRIcon type="barcode" size="md" />
        </VRPressable>
    );
};

const VRSearchInput = ({
    // runQuery,
    searchTerm,
    setSearchTerm
}: {
    // runQuery: any;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [showCamera, setShowCamera] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    // useEffect(() => {
    //     const delayDebounceFn = setTimeout(() => {
    //         const lastCharacter = searchTerm[searchTerm.length - 1];

    //         if (
    //             searchTerm.length > 2 &&
    //             lastCharacter !== ' ' &&
    //             searchTerm[searchTerm.length - 2]
    //         ) {
    //             runQuery({ variables: { search: searchTerm } });
    //         }
    //     }, 500);

    //     return () => clearTimeout(delayDebounceFn);
    // }, [searchTerm, runQuery]);

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
        if (hasPermission) {
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

    const handleBarCodeRead = ({ data }: { data: string | undefined }) => {
        setSearchTerm(data || '');
        runHapticFeedback();
    };

    return (
        <Layout style={styles.container}>
            <VRInput
                onChange={(value) => setSearchTerm(value)}
                value={searchTerm}
                placeholder="Search"
                accessoryRight={
                    <InputIcon
                        setSearchTerm={setSearchTerm}
                        searchTerm={searchTerm}
                        handleBarcodePress={handleBarcodePress}
                    />
                }
            />
            {showCamera && (
                <CameraModal
                    showCamera={showCamera}
                    setShowCamera={setShowCamera}
                    onBarCodeRead={handleBarCodeRead}
                />
            )}
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        marginHorizontal: 20
    }
});

export default VRSearchInput;
