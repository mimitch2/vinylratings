import React from 'react';
import { fireEvent } from '@testing-library/react-native';

import VRRateModal from './VRRateModal';
import { renderWithProvider } from 'test';

describe('VRRateModal', () => {
    const setModalOpenMock = jest.fn();
    const onPressMock = jest.fn();
    it('should call setModalOpen when pressing close', () => {
        const { getByTestId } = renderWithProvider(
            <VRRateModal
                setModalOpen={setModalOpenMock}
                modalOpen
                onPress={onPressMock}
            />
        );

        const close = getByTestId('modal-header-close');

        fireEvent.press(close);

        expect(setModalOpenMock).toHaveBeenLastCalledWith(false);
    });

    it('should render stars as full after tapping', () => {
        const view = renderWithProvider(
            <VRRateModal
                setModalOpen={setModalOpenMock}
                modalOpen
                onPress={onPressMock}
            />
        );

        const { getByTestId } = view;
        const thirdStar = getByTestId('star-clarity-3');

        fireEvent.press(thirdStar);

        expect(view).toMatchSnapshot();
    });

    it('should call onPress when submitting', () => {
        const { getByText, getByTestId, getByLabelText } = renderWithProvider(
            <VRRateModal
                setModalOpen={setModalOpenMock}
                modalOpen
                onPress={onPressMock}
            />
        );

        ['clarity', 'quietness', 'flatness'].forEach((category) => {
            fireEvent.press(getByTestId(`star-${category}-3`));
        });

        fireEvent.changeText(getByLabelText('Notes:'), 'nice');
        fireEvent.press(getByText('SUBMIT'));

        expect(onPressMock).toHaveBeenLastCalledWith({
            clarity: 3,
            flatness: 3,
            quietness: 3,
            notes: 'nice'
        });
    });
});
