import React, { useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { VRText } from 'components';
import { COLORS, ThemeColors, Theme } from 'constants/index';

interface SegmentedProps {
    components: {
        header: string;
        component: React.ReactNode | React.ReactNode[];
    }[];
}

const VRSegmented = ({ components }: SegmentedProps) => {
    const [selectedIdx, setSelectedIdx] = useState(0);
    const { colors }: Theme = useTheme();

    return (
        <View style={styles(colors).container}>
            <View style={styles(colors).headers}>
                {components.map(({ header }, idx) => {
                    const isSelected = selectedIdx === idx;

                    return (
                        <Pressable
                            key={header}
                            onPress={() => setSelectedIdx(idx)}
                            style={({ pressed }) => [
                                {
                                    opacity: pressed ? 0.6 : 1
                                },
                                {
                                    ...styles(colors).headerButton,
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
                                {header}
                            </VRText>
                        </Pressable>
                    );
                })}
            </View>
            <View>{components[selectedIdx].component}</View>
        </View>
    );
};

const styles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            paddingBottom: 10
        },
        headerButton: {
            paddingVertical: 3,
            paddingHorizontal: 10
        },
        headers: {
            borderColor: colors.lightGrey,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            marginVertical: 10,
            flexDirection: 'row'
        }
    });

export default VRSegmented;
