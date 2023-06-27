import React, { useState } from 'react';
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
    accessoryRight = undefined,
    disabled = false
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
    disabled?: boolean;
}) => {
    const [localValue, setLocalValue] = useState<string>(value);

    return (
        <Layout style={containerStyleOverride}>
            <Input
                label={
                    label
                        ? () => {
                              return (
                                  <VRText
                                      styleOverride={{
                                          marginBottom: 5,
                                          marginTop: 10
                                      }}
                                  >
                                      {label}
                                  </VRText>
                              );
                          }
                        : ''
                }
                accessibilityLabel={label}
                testID="input"
                style={styleOverride}
                onChangeText={(newValue) => {
                    setLocalValue(newValue);
                    handleTextChange(newValue);
                }}
                value={localValue}
                placeholder={placeholder}
                multiline={multiline}
                maxLength={maxLength}
                accessoryRight={accessoryRight}
                textStyle={{
                    minHeight: multiline ? 80 : 0
                }}
                disabled={disabled}
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
