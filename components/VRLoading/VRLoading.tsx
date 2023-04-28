import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';

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
        height: '100%',
        width: '100%',
        flex: 1
    }
});

export default VRLoading;
