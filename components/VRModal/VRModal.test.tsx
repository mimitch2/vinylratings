import React from 'react';
import { fireEvent } from '@testing-library/react-native';

import { Text } from 'react-native';
import VRModal from './VRModal';
import { renderWithProvider } from 'test';

describe('VRModal', () => {
    const setModalOpenMock = jest.fn();
    it('should call setModalOpen when closing', () => {
        const { getByTestId } = renderWithProvider(
            <VRModal modalOpen setModalOpen={setModalOpenMock}>
                <Text>Modal content</Text>
            </VRModal>
        );

        fireEvent.press(getByTestId('modal-header-close'));

        expect(setModalOpenMock).toHaveBeenCalledWith(false);
    });

    it('should render title', () => {
        const { getByText } = renderWithProvider(
            <VRModal modalOpen setModalOpen={setModalOpenMock} title="Modal">
                <Text>Modal content</Text>
            </VRModal>
        );

        expect(getByText('Modal')).toBeTruthy();
    });
});
