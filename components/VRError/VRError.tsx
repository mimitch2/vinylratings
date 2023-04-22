import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import * as Updates from 'expo-updates';
import { Layout } from '@ui-kitten/components';

import { VRIcon, VRText, VRButton } from 'components';
import type { IconType } from 'types';
import { TextCategory, Colors } from 'types';

type Levels = 'error' | 'warning' | 'info';
type IconMap = {
    [key in Levels]: {
        icon: IconType;
        color: Colors;
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
    const ICON_MAP: IconMap = {
        error: {
            icon: 'error',
            color: Colors.danger
        },
        warning: {
            icon: 'warning',
            color: Colors.warning
        },
        info: {
            icon: 'questionMark',
            color: Colors.text
        }
    };

    const category = TextCategory.h5;

    return (
        <Layout style={[styles.view, styleOverride]}>
            <VRIcon
                type={ICON_MAP[level].icon}
                size="xlg"
                styleOverride={styles.icon}
                color={ICON_MAP[level].color}
            />

            {error ? (
                <>
                    <VRText category={category} textAlign="center">
                        {error?.message ?? message}
                    </VRText>
                    <VRButton
                        containerStyle={{ marginTop: 20 }}
                        trackID={trackID || 'vr_error-general'}
                        title="Restart"
                        onPress={async () => {
                            await Updates.reloadAsync();
                        }}
                        variant="danger"
                    />
                </>
            ) : (
                <VRText
                    category={category}
                    styleOverride={{ textAlign: 'center' }}
                >
                    {message}
                </VRText>
            )}
        </Layout>
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
