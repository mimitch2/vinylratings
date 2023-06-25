import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { VRText, VRDivider, VRPressable, VRIcon } from 'components';
import type { Nav } from 'types';

const VRNavRow = ({
    navigation,
    route,
    params,
    label,
    trackID,
    renderBottomDivider = true
}: {
    navigation: Nav;
    route: string;
    params?: { [key: string]: string | number };
    label: string;
    trackID: string;
    renderBottomDivider?: boolean;
}) => {
    return (
        <VRPressable
            trackID={trackID}
            onPress={() => {
                navigation.navigate({
                    name: route,
                    params
                });
            }}
        >
            <VRDivider />
            <Layout style={styles.row}>
                <VRText>{label}</VRText>
                <VRIcon type="chevronRight" size="sm" />
            </Layout>
            {renderBottomDivider && <VRDivider />}
        </VRPressable>
    );
};

const styles = StyleSheet.create({
    row: {
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default VRNavRow;
