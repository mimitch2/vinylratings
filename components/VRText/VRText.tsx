import React, { useMemo } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { FONTS, Theme } from 'constants/index';
import { useTheme } from '@react-navigation/native';

export const VRText = ({
    children,
    size = 16,
    color = null,
    fontWeight = '500',
    fontStyle = 'normal',
    textAlign = 'left',
    styleOverride = {},
    numberOfLines = undefined
}: {
    children: React.ReactNode;
    size?: number;
    color?: string | null;
    fontWeight?:
        | 'normal'
        | 'bold'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900'
        | undefined;
    fontStyle?: 'normal' | 'italic' | undefined;
    textAlign?: 'left' | 'center' | 'right';
    styleOverride?: TextStyle;
    numberOfLines?: number | undefined;
}) => {
    const { colors }: Theme = useTheme();

    const styleFromProps = useMemo(
        () => ({
            fontSize: size,
            color: color ?? colors.text,
            fontWeight,
            fontStyle,
            textAlign
        }),
        [size, color, fontWeight, fontStyle, textAlign, colors]
    );

    return (
        <Text
            style={[styles.text, styleFromProps, styleOverride]}
            numberOfLines={numberOfLines}
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: FONTS.primary,
        flexShrink: 1
    }
});

export default VRText;
