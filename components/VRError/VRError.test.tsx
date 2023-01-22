import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import 'react-native';
import RNRestart from 'react-native-restart';

import VRError from './VRError';

describe('VRError', () => {
    it('should render custom error message', () => {
        const error = {
            name: '',
            message: 'Custom message'
        };
        const { getByText } = render(
            <VRError level="error" error={error} trackID="track_id" />
        );

        expect(getByText('Custom message')).toBeTruthy();
    });

    it('should render restart button and call RNRestart onPress', () => {
        jest.spyOn(RNRestart, 'Restart');

        const error = {
            name: '',
            message: 'Custom message'
        };

        const { getByText } = render(
            <VRError level="error" error={error} trackID="track_id" />
        );
        fireEvent.press(getByText('Restart'));

        expect(RNRestart.Restart).toHaveBeenCalledTimes(1);
    });

    it('should render warning', () => {
        const { getByText } = render(<VRError level="warning" />);

        expect(getByText('Something went wrong!')).toBeTruthy();
    });
});
