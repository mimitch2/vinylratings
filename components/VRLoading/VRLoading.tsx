import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { Theme, ThemeColors } from '../../constants';
import { HEIGHT } from '../../constants';

const VRLoading = () => {
    const { colors }: Theme = useTheme();

    return (
        <View style={styles(colors).view} testID="loading">
            <ActivityIndicator size="large" />
        </View>
    );
};

const styles = (colors: ThemeColors) =>
    StyleSheet.create({
        view: {
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            height: HEIGHT - 150,
            width: '100%',
            backgroundColor: colors.background
        }
    });

export default VRLoading;
