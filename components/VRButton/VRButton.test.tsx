import React from 'react';
import { screen, fireEvent } from '@testing-library/react-native';

import VRButton from './VRButton';
import { renderWithProvider } from 'test';

describe('VRButton', () => {
    const onPressMock = jest.fn();
    it('should call onPress when pressed', () => {
        renderWithProvider(
            <VRButton onPress={onPressMock} title="test" trackID="track" />
        );

        const button = screen.getByText('TEST');
        fireEvent.press(button);

        expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('should render correct text', () => {
        renderWithProvider(
            <VRButton onPress={onPressMock} title="test" trackID="track" />
        );
        const button = screen.getByText('TEST');
        expect(button).toHaveTextContent('TEST');
    });
});
