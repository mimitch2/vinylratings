import React from 'react';
import { View, StyleSheet } from 'react-native';

import { UserData, IconSize, Colors } from 'types';
import { VRIcon } from 'components';

const VRListIndicator = ({
    userData,
    size = 'md'
}: {
    userData: UserData | null;
    size?: IconSize;
}) => {
    return (
        <View style={styles.container}>
            {userData?.in_collection ? (
                <VRIcon
                    type="collection"
                    testID="collection-icon"
                    size={size}
                    color={Colors.warning}
                />
            ) : null}
            {userData?.in_wantlist ? (
                <View style={styles.wantIcon}>
                    <VRIcon
                        type="want"
                        testID="want-icon"
                        size={size}
                        color={Colors.warning}
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
