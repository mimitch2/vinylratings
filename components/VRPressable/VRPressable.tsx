import React from 'react';
import { Pressable, ViewStyle, StyleProp } from 'react-native';

import { VoidFuncNoParams } from 'types';
import { PRESSED_OR_DISABLED_OPACITY } from 'constants/index';

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
                {
                    opacity:
                        pressed || disabled ? PRESSED_OR_DISABLED_OPACITY : 1.0
                },
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
