import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { Camera, CameraType } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

import EditScreenInfo from 'components/EditScreenInfo';
import { Text, View } from 'components/Themed';
import { RootTabScreenProps } from 'types';
import { VRIcon } from 'components/';
import { COLORS, FONTS } from 'constants';
import Barcode from '../components/VRIcon/Icons/Barcode';

export const GET_FOLDERS = gql`
    query GetFolders {
        getFolders {
            id
            name
            count
        }
    }
`;

export default function TabOneScreen({
    navigation
}: RootTabScreenProps<'TabOne'>) {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);
    const { data, loading } = useQuery(GET_FOLDERS);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    if (loading) {
        return null;
    }

    const {
        Constants: {
            BarCodeType: { code39, code128, itf14, upc_e, ean13 }
        }
    } = BarCodeScanner;

    return (
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
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
            {/* <View style={styles.layerCenter}>
                <View style={styles.layerLeft} />
                <View style={styles.focused} />
                <View style={styles.layerRight} />
            </View>
            <View style={styles.layerBottom} /> */}
        </BarCodeScanner>
    );
}
const opacity = 'rgba(0, 0, 0, .6)';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    camera: {
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%'
    },
    layerTop: {
        flex: 2,
        backgroundColor: opacity
    },
    layerCenter: {
        flex: 1,
        flexDirection: 'row'
    },
    layerLeft: {
        flex: 1,
        backgroundColor: opacity
    },
    focused: {
        flex: 10
    },
    layerRight: {
        flex: 1,
        backgroundColor: opacity
    },
    layerBottom: {
        flex: 2,
        backgroundColor: opacity
    }
});
