import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { HEIGHT } from 'constants/index';

const VRLoading = () => {
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
