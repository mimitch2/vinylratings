import React, { useState } from 'react';
import { StyleSheet, View, ViewStyle, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { VRText } from 'components';
import { Theme } from 'constants/index';

interface SegmentedProps {
    data: {
        label: string;
        value?: string | number;
        component?: React.ReactNode | React.ReactNode[];
    }[];
    onPress?: (value: any) => void;
    containerStyleOverride?: ViewStyle;
    labelStyleOverride?: ViewStyle;
}

const VRSegmented = ({
    data,
    onPress,
    containerStyleOverride = {},
    labelStyleOverride = {}
}: SegmentedProps) => {
    const [selectedIdx, setSelectedIdx] = useState(0);
    const { colors }: Theme = useTheme();

    const handleOnPress = (idx: number, value?: string | number) => {
        setSelectedIdx(idx);
        onPress && value && onPress(value);
    };

    return (
        <View style={[styles.container, containerStyleOverride]}>
            <View
                style={[
                    styles.labels,
                    { borderColor: colors.lightGrey },
                    labelStyleOverride
                ]}
            >
                {data.map((section, idx) => {
                    const { label } = section;
                    const value = section.value || null;
                    const isSelected = selectedIdx === idx;

                    return (
                        <Pressable
                            key={label}
                            onPress={() => handleOnPress(idx, value)}
                            style={({ pressed }) => [
                                {
                                    opacity: pressed ? 0.6 : 1
                                },
                                {
                                    ...styles.headerButton,
                                    backgroundColor: isSelected
                                        ? colors.tertiary
                                        : colors.background
                                }
                            ]}
                        >
                            <VRText
                                color={
                                    isSelected ? colors.background : colors.text
                                }
                            >
                                {label}
                            </VRText>
                        </Pressable>
                    );
                })}
            </View>
            {data[selectedIdx]?.component && (
                <View>{data[selectedIdx].component}</View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10
    },
    headerButton: {
        paddingVertical: 3,
        paddingHorizontal: 10
    },
    labels: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default VRSegmented;
