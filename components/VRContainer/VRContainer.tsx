import React, { useRef, useEffect } from 'react';
import {
    Animated,
    StyleSheet,
    View,
    RefreshControl,
    ViewStyle
} from 'react-native';
// import { useTheme } from '@react-navigation/native';
import { Layout } from '@ui-kitten/components';

import { VRLoading } from 'components';
import { FONTS, Theme, ThemeColors } from 'constants/index';

interface Props {
    children: React.ReactNode;
    scrollable?: boolean;
    isLoading?: boolean | undefined;
    animationDuration?: number;
    animationDelay?: number;
    startAnimation?: boolean;
    styleOverride?: ViewStyle;
    refreshing?: boolean;
    onRefresh?: any;
}

const VRContainer = ({
    children,
    scrollable = true,
    isLoading = false,
    animationDuration = 100,
    animationDelay = 50,
    startAnimation = false,
    styleOverride = {},
    refreshing = false,
    onRefresh = null
}: Props) => {
    const fadeIn = useRef(new Animated.Value(0)).current;

    const commonStyle = [
        {
            padding: 20,
            opacity: fadeIn
        },
        styleOverride
    ];

    useEffect(() => {
        if (startAnimation) {
            Animated.timing(fadeIn, {
                toValue: 1,
                useNativeDriver: true,
                duration: animationDuration,
                delay: animationDelay
            }).start();
        }
    }, [fadeIn, startAnimation, animationDuration, animationDelay]);

    if (isLoading) {
        return <VRLoading />;
    }

    return scrollable ? (
        <Layout
            style={[styles.view, { opacity: refreshing ? 0.6 : 1 }]}
            testID="scroll"
        >
            <Animated.ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={commonStyle}
                refreshControl={
                    onRefresh ? (
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            // colors={[colors.lightGrey]}
                            // tintColor={colors.lightGrey}
                        />
                    ) : undefined
                }
            >
                <View>{children}</View>
            </Animated.ScrollView>
        </Layout>
    ) : (
        <Layout style={styles.view} testID="view">
            <Animated.View style={commonStyle}>
                <View>{children}</View>
            </Animated.View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        fontFamily: FONTS.primary
    }
});

export default React.memo(VRContainer);
