import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { UserData, IconSize } from 'types';
import { VRIcon } from 'components';

const VRListIndicator = ({
    userData,
    size = 'md'
}: {
    userData: UserData | null;
    size?: IconSize;
}) => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            {userData?.in_collection ? (
                <VRIcon
                    type="collection"
                    color={colors.primary}
                    testID="collection-icon"
                    size={size}
                />
            ) : null}
            {userData?.in_wantlist ? (
                <View style={styles.wantIcon}>
                    <VRIcon
                        type="want"
                        color={colors.primary}
                        testID="want-icon"
                        size={size}
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
