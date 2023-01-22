import React from 'react';
import VRButton from './VRButton';

import { render, screen, fireEvent } from '@testing-library/react-native';

describe('VRButton', () => {
    const onPressMock = jest.fn();
    it('should call onPress when pressed', () => {
        render(<VRButton onPress={onPressMock} title="test" trackID="track" />);

        const button = screen.getByText('test');
        fireEvent.press(button);

        expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('should render correct text', () => {
        render(<VRButton onPress={onPressMock} title="test" trackID="track" />);
        const button = screen.getByText('test');
        expect(button).toHaveTextContent('test');
    });
});
