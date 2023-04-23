import React from 'react';
import { TextStyle } from 'react-native';
import { Text } from '@ui-kitten/components';

import { TextCategory } from 'types';

export const VRText = ({
    children,
    textAlign = 'left',
    styleOverride = {},
    numberOfLines = undefined,
    status = 'basic',
    appearance = 'default',
    fontType = 'normal'
}: {
    children: string | string[] | number;
    textAlign?: 'left' | 'center' | 'right';
    styleOverride?: TextStyle;
    numberOfLines?: number | undefined;
    status?:
        | 'basic'
        | 'primary'
        | 'success'
        | 'info'
        | 'warning'
        | 'danger'
        | 'control';
    appearance?: 'default' | 'alternative' | 'hint' | 'control';
    fontType?:
        | 'normal'
        | 'bold'
        | 'italic'
        | 'bold-italic'
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'caption'
        | 'caption-italic'
        | 'label';
}) => {
    const getFont = () => {
        switch (fontType) {
            case 'bold':
                return TextCategory.p2;
            case 'italic':
                return TextCategory.s1;
            case 'bold-italic':
                return TextCategory.s2;
            case 'h1':
                return TextCategory.h1;
            case 'h2':
                return TextCategory.h2;
            case 'h3':
                return TextCategory.h3;
            case 'h4':
                return TextCategory.h4;
            case 'h5':
                return TextCategory.h5;
            case 'h6':
                return TextCategory.h6;
            case 'caption':
                return TextCategory.c1;
            case 'caption-italic':
                return TextCategory.c2;
            case 'label':
                return TextCategory.label;
            default:
                return TextCategory.p1;
        }
    };

    return (
        <Text
            style={[{ flexShrink: 1, textAlign }, styleOverride]}
            numberOfLines={numberOfLines}
            category={getFont()}
            status={status}
            appearance={appearance}
        >
            {children}
        </Text>
    );
};

export default VRText;
