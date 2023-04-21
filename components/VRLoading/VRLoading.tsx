import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {
    BottomNavigation,
    BottomNavigationTab,
    BottomNavigationProps,
    Layout,
    Text
} from '@ui-kitten/components';
import { Theme, HEIGHT } from 'constants/index';

const VRLoading = () => {
    const { colors }: Theme = useTheme();

    return (
        <Layout style={styles.view} testID="loading">
            <ActivityIndicator size="large" />
        </Layout>
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
