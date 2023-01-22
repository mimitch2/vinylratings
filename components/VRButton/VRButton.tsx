import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { VRText, VRPressable } from 'components';
import { Theme, ColorsKeys } from 'constants';
import { VoidFuncNoParams } from 'types';

type ButtonVariants = 'primary' | 'secondary' | 'tertiary' | 'danger';
type VariantMap = {
    [key in ButtonVariants]: { bg: string; text: string };
};

const VARIANT_MAP: VariantMap = {
    primary: { bg: 'primary', text: 'background' },
    tertiary: { bg: 'tertiary', text: 'background' },
    secondary: { bg: 'secondary', text: 'background' },
    danger: { bg: 'danger', text: 'background' }
};

const VRButton = ({
    onPress,
    title,
    small = false,
    variant = 'primary',
    trackID,
    containerStyle = {},
    disabled = false,
    testID = null,
    stacked = true
}: {
    onPress: VoidFuncNoParams;
    title: string;
    small?: boolean;
    variant?: ButtonVariants;
    trackID: string;
    containerStyle?: Object;
    disabled?: boolean;
    testID?: string | null;
    stacked?: boolean;
}) => {
    const { colors }: Theme = useTheme();
    const bgVariant = VARIANT_MAP[variant].bg;
    const textVariant = VARIANT_MAP[variant].text;
    const backgroundColor: string = colors[bgVariant as ColorsKeys];
    const color: string = colors[textVariant as ColorsKeys];

    return (
        <VRPressable
            styleOverride={[
                small
                    ? styles(backgroundColor, stacked).buttonSmall
                    : styles(backgroundColor, stacked).button,
                containerStyle
            ]}
            onPress={onPress}
            trackID={trackID}
            disabled={disabled}
            testID={testID}
        >
            <VRText color={color} size={small ? 12 : 20} fontWeight="bold">
                {title}
            </VRText>
        </VRPressable>
    );
};

const styles = (backgroundColor: string, stacked: boolean) =>
    StyleSheet.create({
        button: {
            backgroundColor,
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 25,
            alignItems: 'center',
            flex: stacked ? 0 : 1
        },
        buttonSmall: {
            backgroundColor,
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 10
        }
    });
export default VRButton;
