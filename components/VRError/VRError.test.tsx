import React from 'react';
// import { fireEvent } from '@testing-library/react-native';
import 'react-native';

import VRError from './VRError';
import { renderWithProvider } from 'test';

describe('VRError', () => {
    it('should render custom error message', () => {
        const error = {
            name: '',
            message: 'Custom message'
        };
        const { getByText } = renderWithProvider(
            <VRError level="error" error={error} trackID="track_id" />
        );

        expect(getByText('Custom message')).toBeTruthy();
    });

    // it('should render restart button and call RNRestart onPress', () => {
    //     // jest.spyOn(RNRestart, 'Restart');

    //     const error = {
    //         name: '',
    //         message: 'Custom message'
    //     };

    //     const { getByText } = render(
    //         <VRError level="error" error={error} trackID="track_id" />
    //     );
    //     fireEvent.press(getByText('Restart'));
    // });

    it('should render warning', () => {
        const { getByText } = renderWithProvider(<VRError level="warning" />);

        expect(getByText('Something went wrong!')).toBeTruthy();
    });
});
