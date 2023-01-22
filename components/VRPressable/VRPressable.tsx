import React from 'react';
import { Pressable, ViewStyle, StyleProp } from 'react-native';

import { VoidFuncNoParams } from '../../types';

const VRPressable = ({
    trackID,
    onPress,
    children,
    styleOverride = {},
    disabled = false,
    testID = null
}: {
    trackID: string;
    onPress: VoidFuncNoParams;
    children: React.ReactNode | React.ReactNode[];
    styleOverride?: StyleProp<ViewStyle>;
    disabled?: boolean;
    testID?: string | null;
}) => {
    return (
        <Pressable
            testID={testID || 'pressable'}
            disabled={disabled}
            style={({ pressed }) => [
                { opacity: pressed || disabled ? 0.6 : 1.0 },
                styleOverride
            ]}
            onPress={() => {
                onPress();

                // TODO: create tracking
                console.log(trackID);
            }}
        >
            {children}
        </Pressable>
    );
};

export default VRPressable;
