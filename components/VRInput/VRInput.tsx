import React from 'react';
import {
    StyleSheet,
    TextInput,
    StyleProp,
    TextStyle,
    View
} from 'react-native';
import { useTheme } from '@react-navigation/native';

import { Theme, ThemeColors, FONTS } from '../../constants';
import { VRText } from '../';

const VRInput = ({
    handleTextChange,
    value,
    placeholder = '',
    multiline = false,
    styleOverride = {},
    containerStyleOverride = {},
    label = '',
    labelSize = 16,
    maxLength = 250,
    showLength = false
}: {
    handleTextChange: (value: string) => void;
    value: string;
    placeholder?: string;
    multiline?: boolean;
    styleOverride?: StyleProp<TextStyle>;
    containerStyleOverride?: StyleProp<TextStyle>;
    label?: string;
    labelSize?: number;
    maxLength?: number;
    showLength?: boolean;
}) => {
    const { colors }: Theme = useTheme();

    return (
        <View style={containerStyleOverride}>
            {label ? <VRText size={labelSize}>{label}</VRText> : null}
            <TextInput
                testID="input"
                style={[styles(colors).input, styleOverride]}
                onChangeText={handleTextChange}
                value={value}
                placeholder={placeholder}
                multiline={multiline}
                maxLength={maxLength}
            />
            {showLength ? (
                <VRText
                    styleOverride={{ opacity: 0.7, alignSelf: 'flex-end' }}
                >{`${value.length}/${maxLength}`}</VRText>
            ) : null}
        </View>
    );
};

const styles = (colors: ThemeColors) =>
    StyleSheet.create({
        input: {
            fontFamily: FONTS.primary,
            borderColor: colors.primary,
            borderWidth: 1,
            padding: 5,
            color: colors.text,
            borderRadius: 3
        }
    });

export default VRInput;
