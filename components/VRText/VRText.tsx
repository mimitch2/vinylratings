import React from 'react';
import { TextStyle } from 'react-native';
import { Text } from '@ui-kitten/components';

import { FONTS } from 'constants/index';
import { TextCategory, Colors } from 'types';
import { useColorTheme } from 'hooks';

export const VRText = ({
    children,
    category = TextCategory.p1,
    color = Colors.text,
    fontWeight = 'normal',
    fontStyle = 'normal',
    fontFamily = null,
    textAlign = 'left',
    styleOverride = {},
    numberOfLines = undefined
}: {
    children: string | string[] | number;
    category?: TextCategory;
    color?: Colors;
    fontWeight?: 'normal' | 'bold' | '500' | '600';
    fontStyle?: 'normal' | 'italic';
    textAlign?: 'left' | 'center' | 'right';
    fontFamily?: string | null;
    styleOverride?: TextStyle;
    numberOfLines?: number | undefined;
}) => {
    const themeColor = useColorTheme(color);
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
            style={[
                { flexShrink: 1, color: themeColor },
                styleFromProps,
                styleOverride
            ]}
            numberOfLines={numberOfLines}
            category={category}
        >
            {children}
        </Text>
    );
};

export default VRText;
