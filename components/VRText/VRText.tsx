import React from 'react';
import { TextStyle } from 'react-native';
import { Text } from '@ui-kitten/components';

import { TextCategory } from 'types';

export const VRText = ({
    children,
    category = TextCategory.p1,
    textAlign = 'left',
    styleOverride = {},
    numberOfLines = undefined,
    status = 'basic',
    appearance = 'default'
}: {
    children: string | string[] | number;
    category?: TextCategory;
    textAlign?: 'left' | 'center' | 'right';
    styleOverride?: TextStyle;
    numberOfLines?: number | undefined;
    status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
    appearance?: 'default' | 'alternative' | 'hint' | 'control';
}) => {
    return (
        <Text
            style={[{ flexShrink: 1, textAlign }, styleOverride]}
            numberOfLines={numberOfLines}
            category={category}
            status={status}
            appearance={appearance}
        >
            {children}
        </Text>
    );
};

export default VRText;
