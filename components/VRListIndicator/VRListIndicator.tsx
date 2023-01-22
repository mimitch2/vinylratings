import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { UserData } from '../../types';
import { VRIcon } from '../';

const VRListIndicator = ({ userData }: { userData: UserData | null }) => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            {userData?.in_collection ? (
                <VRIcon
                    type="collection"
                    color={colors.primary}
                    testID="collection-icon"
                />
            ) : null}
            {userData?.in_wantlist ? (
                <View style={styles.wantIcon}>
                    <VRIcon
                        type="want"
                        color={colors.primary}
                        testID="want-icon"
                    />
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    wantIcon: {
        marginLeft: 6
    }
});

export default VRListIndicator;
