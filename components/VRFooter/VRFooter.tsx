import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Layout } from '@ui-kitten/components';
const VRFooter = ({
    children,
    styleOverride = {}
}: {
    children: React.ReactNode;
    styleOverride?: ViewStyle;
}) => {
    return (
        <Layout style={[styles.container, styleOverride]}>{children}</Layout>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 }
});

export default VRFooter;
