import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { FONTS, Theme } from 'constants/index';
import { useTheme } from '@react-navigation/native';

export const VRText = ({
    children,
    size = 18,
    color = null,
    fontWeight = 'normal',
    fontStyle = 'normal',
    fontFamily = null,
    textAlign = 'left',
    styleOverride = {},
    numberOfLines = undefined
}: {
    children: React.ReactNode;
    size?: number;
    color?: string | null;
    fontWeight?: 'normal' | 'bold' | '500' | '600';
    fontStyle?: 'normal' | 'italic';
    textAlign?: 'left' | 'center' | 'right';
    fontFamily?: string | null;
    styleOverride?: TextStyle;
    numberOfLines?: number | undefined;
}) => {
    const { colors }: Theme = useTheme();

    const getFontFamily = () => {
        if (fontFamily) {
            return fontFamily;
        }

        if (fontWeight === 'normal') {
            if (fontStyle === 'italic') {
                return FONTS.italic;
            }
            return FONTS.primary;
        }

        if (fontWeight === 'bold') {
            if (fontStyle === 'italic') {
                return FONTS.boldItalic;
            }
            return FONTS.bold;
        }

        return FONTS.primary;
    };

    const styleFromProps = {
        fontSize: size,
        color: color ?? colors.text,
        textAlign,
        fontFamily: getFontFamily()
    };

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
