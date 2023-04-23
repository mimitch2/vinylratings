import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

import { VRText } from 'components';
import { Layout, Input } from '@ui-kitten/components';

const VRInput = ({
    handleTextChange,
    value,
    placeholder = '',
    multiline = false,
    styleOverride = {},
    containerStyleOverride = {},
    label = '',
    maxLength = 250,
    showLength = false,
    accessoryRight = undefined
}: {
    handleTextChange: (value: string) => void;
    value: string;
    placeholder?: string;
    multiline?: boolean;
    styleOverride?: StyleProp<TextStyle>;
    containerStyleOverride?: StyleProp<TextStyle>;
    label?: string;
    maxLength?: number;
    showLength?: boolean;
    accessoryRight?: React.ReactElement;
}) => {
    return (
        <Layout style={containerStyleOverride}>
            {label ? <VRText>{label}</VRText> : null}
            <Input
                testID="input"
                style={styleOverride}
                onChangeText={handleTextChange}
                value={value}
                placeholder={placeholder}
                multiline={multiline}
                maxLength={maxLength}
                accessoryRight={accessoryRight}
            />
            {showLength ? (
                <VRText
                    styleOverride={{ opacity: 0.7, alignSelf: 'flex-end' }}
                >{`${value.length}/${maxLength}`}</VRText>
            ) : null}
        </Layout>
    );
};

export default VRInput;
