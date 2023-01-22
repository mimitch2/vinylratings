import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { VRText } from '../';
import { Theme, ThemeColors } from '../../constants';

const VRTag = ({
    tag,
    size = 'sm'
}: {
    tag: string | number;
    size: 'sm' | 'lg';
}) => {
    const { colors }: Theme = useTheme();

    return (
        <View
            style={[
                styles(colors).view,
                {
                    paddingHorizontal: size === 'sm' ? 8 : 9,
                    paddingVertical: size === 'sm' ? 0 : 1
                }
            ]}
        >
            <VRText size={size === 'sm' ? 12 : 14} color={colors.background}>
                {tag}
            </VRText>
        </View>
    );
};

const styles = (colors: ThemeColors) =>
    StyleSheet.create({
        view: {
            backgroundColor: colors.primary,
            borderRadius: 3,
            marginRight: 3,
            marginBottom: 10
        }
    });

export default VRTag;
