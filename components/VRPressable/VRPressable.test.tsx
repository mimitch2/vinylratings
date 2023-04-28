import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';

import VRPressable from './VRPressable';
import { renderWithProvider } from 'test';

describe('VRPressable', () => {
    const onPressMock = jest.fn();
    it('should call onPress when pressed', () => {
        const text = `VRPressable test`;

        const { getByText } = renderWithProvider(
            <VRPressable onPress={onPressMock} trackID="track-id">
                <Text>{text}</Text>
            </VRPressable>
        );

        const pressable = getByText(text);
        fireEvent.press(pressable);

        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});
