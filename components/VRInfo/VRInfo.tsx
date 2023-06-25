import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { VRText } from 'components';
import { useColorTheme } from 'hooks';
import { Colors } from 'types';

const VRInfo = ({ onPress }: { onPress: (value?: any) => void }) => {
    const backgroundColor = useColorTheme(Colors.warning);

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                {
                    opacity: pressed ? 0.5 : 1,
                    backgroundColor
                },
                styles.view
            ]}
        >
            <VRText styleOverride={styles.text} fontType="caption">
                ?
            </VRText>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    view: {
        height: 16,
        width: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    text: { top: -1 }
});

export default VRInfo;
