import React, { useState } from 'react';
import { StyleSheet, View, ViewStyle, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { VRText } from 'components';
import { Theme, PRESSED_OR_DISABLED_OPACITY } from 'constants/index';

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

    const handleOnPress = (
        idx: number,
        value?: string | number | undefined
    ) => {
        setSelectedIdx(idx);
        onPress && value && onPress(value);
    };

    return (
        <View style={[styles.container, containerStyleOverride]}>
            <View style={[styles.labels, labelStyleOverride]}>
                {data.map((section, idx) => {
                    const { label } = section;
                    const value = section.value;
                    const isSelected = selectedIdx === idx;

                    return (
                        <Pressable
                            key={label}
                            onPress={() => handleOnPress(idx, value)}
                            style={({ pressed }) => [
                                styles.headerButton,
                                {
                                    opacity: pressed
                                        ? PRESSED_OR_DISABLED_OPACITY
                                        : 1,
                                    borderColor: isSelected
                                        ? colors.primary
                                        : colors.grey
                                }
                            ]}
                        >
                            <VRText>{label}</VRText>
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
        borderBottomWidth: 2,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 10
    },
    labels: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default VRSegmented;
