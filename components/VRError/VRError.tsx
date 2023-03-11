import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import RNRestart from 'react-native-restart';
import { useTheme } from '@react-navigation/native';

import { VRIcon, VRText, VRButton } from 'components';
import type { IconType } from 'types';
import type { Theme } from 'constants/index';

type Levels = 'error' | 'warning' | 'info';
type IconMap = {
    [key in Levels]: {
        icon: IconType;
        color: string;
    };
};
interface CommonProps {
    level: Levels;
    styleOverride?: ViewStyle;
    message?: string;
}
type ConditionalProps =
    | {
          error: Error;
          trackID: string;
      }
    | {
          error?: null;
          trackID?: never;
      };

type Props = CommonProps & ConditionalProps;

const VRError = ({
    message = 'Something went wrong!',
    error = null,
    level,
    styleOverride = {},
    trackID
}: Props) => {
    const { colors }: Theme = useTheme();

    const ICON_MAP: IconMap = {
        error: {
            icon: 'error',
            color: colors.danger
        },
        warning: {
            icon: 'warning',
            color: colors.tertiary
        },
        info: {
            icon: 'questionMark',
            color: colors.primary
        }
    };

    return (
        <View
            style={[
                styles.view,
                { backgroundColor: colors.background },
                styleOverride
            ]}
        >
            <VRIcon
                type={ICON_MAP[level].icon}
                size="xlg"
                styleOverride={styles.icon}
                color={ICON_MAP[level].color}
            />

            {error ? (
                <>
                    <VRText size={18} fontWeight="bold" textAlign="center">
                        {error?.message ?? message}
                    </VRText>
                    <VRButton
                        containerStyle={{ marginTop: 20 }}
                        trackID={trackID || 'vr_error-general'}
                        title="Restart"
                        onPress={() => {
                            RNRestart.Restart();
                        }}
                    />
                </>
            ) : (
                <VRText
                    size={24}
                    fontWeight="bold"
                    styleOverride={{ textAlign: 'center' }}
                >
                    {message}
                </VRText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        marginBottom: 10
    },
    view: {
        alignItems: 'center',
        paddingTop: '50%'
    }
});

export default VRError;
