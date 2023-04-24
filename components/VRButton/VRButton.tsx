import React from 'react';
import { Button, Text } from '@ui-kitten/components';

import { VoidFuncNoParams } from 'types';

type ButtonVariants =
    | 'primary'
    | 'info'
    | 'warning'
    | 'danger'
    | 'basic'
    | 'text';
type VariantMap = {
    [key in ButtonVariants]: { appearance: string; status: string };
};
type Sizes = 'tiny' | 'small' | 'medium' | 'large' | 'huge';
type FontSizeMap = {
    [key in Sizes]: number;
};

const VARIANT_MAP: VariantMap = {
    primary: { appearance: 'filled', status: 'primary' },
    info: { appearance: 'outline', status: 'info' },
    warning: { appearance: 'filled', status: 'warning' },
    danger: { appearance: 'filled', status: 'danger' },
    basic: { appearance: 'outline', status: 'basic' },
    text: { appearance: 'ghost', status: 'basic' }
};

const FONT_SIZE_MAP: FontSizeMap = {
    tiny: 14,
    small: 16,
    medium: 18,
    large: 20,
    huge: 24
};

const VRButton = ({
    onPress,
    title,
    size = 'medium',
    variant = 'primary',
    trackID,
    containerStyle = {},
    disabled = false,
    stacked = true,
    accessoryRight = undefined
}: {
    onPress: VoidFuncNoParams;
    title: string;
    size?: Sizes;
    variant?: ButtonVariants;
    trackID: string;
    containerStyle?: Object;
    disabled?: boolean;
    stacked?: boolean;
    accessoryRight?: React.ReactElement | undefined;
}) => {
    return (
        <Button
            onPress={onPress}
            disabled={disabled}
            style={[
                {
                    flex: stacked ? 0 : 1
                },
                containerStyle
            ]}
            size={size}
            onPressIn={() => {
                console.log(trackID);
            }}
            appearance={
                VARIANT_MAP?.[variant]?.appearance ??
                VARIANT_MAP.primary.appearance
            }
            status={
                VARIANT_MAP?.[variant]?.status ?? VARIANT_MAP.primary.status
            }
            accessoryRight={accessoryRight}
        >
            {(evaProps) => {
                return (
                    <Text
                        {...evaProps}
                        style={{
                            fontSize:
                                FONT_SIZE_MAP?.[size] ?? FONT_SIZE_MAP.large
                        }}
                    >
                        {title.toUpperCase()}
                    </Text>
                );
            }}
        </Button>
    );
};

export default VRButton;
