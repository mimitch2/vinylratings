import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

import { VRText } from 'components';
import { Layout, Input } from '@ui-kitten/components';

const VRInput = ({
    onChange,
    value,
    placeholder = '',
    multiline = false,
    styleOverride = {},
    containerStyleOverride = {},
    label = '',
    maxLength = 250,
    showLength = false,
    accessoryRight = undefined,
    disabled = false,
    controlRight = undefined
}: {
    onChange: (value: string) => void;
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
    controlRight?: React.ReactElement;
}) => {
    return (
        <Layout style={containerStyleOverride}>
            <Layout
                style={{
                    flex: 1,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}
            >
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
                    style={[{ flex: 1 }, styleOverride]}
                    onChangeText={(newValue) => {
                        onChange(newValue);
                    }}
                    value={value as string}
                    placeholder={placeholder}
                    multiline={multiline}
                    maxLength={maxLength}
                    accessoryRight={accessoryRight}
                    // textStyle={{
                    //     minHeight: multiline ? 80 : 0
                    // }}
                    disabled={disabled}
                />
                {controlRight}
            </Layout>
            {showLength ? (
                <VRText
                    styleOverride={{ opacity: 0.7, alignSelf: 'flex-end' }}
                >{`${value.length}/${maxLength}`}</VRText>
            ) : null}
        </Layout>
    );
};

export default VRInput;
