import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { Theme, HEIGHT } from 'constants/index';

const VRLoading = () => {
    const { colors }: Theme = useTheme();

    return (
        <View
            style={[styles.view, { backgroundColor: colors.background }]}
            testID="loading"
        >
            <ActivityIndicator size="large" />
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: HEIGHT - 150,
        width: '100%'
    }
});

export default VRLoading;
