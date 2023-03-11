import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

const VRFooter = ({
    children,
    styleOverride = {}
}: {
    children: React.ReactNode;
    styleOverride?: ViewStyle;
}) => {
    return <View style={[styles.container, styleOverride]}>{children}</View>;
};

const styles = StyleSheet.create({
    container: { padding: 20 }
});

export default VRFooter;
