import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Divider } from '@ui-kitten/components';

import { useColorTheme } from 'hooks';
import { Colors } from 'types';

const VRDivider = ({
    color = Colors.textFaded,
    styleOverride = {}
}: {
    color?: Colors;
    styleOverride?: StyleProp<ViewStyle>;
}) => {
    return (
        <Divider
            style={[{ backgroundColor: useColorTheme(color) }, styleOverride]}
        />
    );
};

export default VRDivider;
