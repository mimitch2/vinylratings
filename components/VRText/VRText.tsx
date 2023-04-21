import React from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import { FONTS } from 'constants/index';
import { Text } from '@ui-kitten/components';
import { TextCategory } from 'types';

export const VRText = ({
    children,
    category = TextCategory.p1,
    color = null,
    fontWeight = 'normal',
    fontStyle = 'normal',
    fontFamily = null,
    textAlign = 'left',
    styleOverride = {},
    numberOfLines = undefined
}: {
    children: string;
    category?: TextCategory;
    color?: string | null;
    fontWeight?: 'normal' | 'bold' | '500' | '600';
    fontStyle?: 'normal' | 'italic';
    textAlign?: 'left' | 'center' | 'right';
    fontFamily?: string | null;
    styleOverride?: TextStyle;
    numberOfLines?: number | undefined;
}) => {
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
        textAlign,
        fontFamily: getFontFamily()
    };

    return (
        <Text
            style={[styles.text, styleFromProps, styleOverride]}
            numberOfLines={numberOfLines}
            category={category}
            // appearance="hint"
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        // fontFamily: FONTS.primary,
        flexShrink: 1
    }
});

export default VRText;
