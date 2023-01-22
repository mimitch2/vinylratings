import { render, fireEvent } from '@testing-library/react-native';

import { Text } from 'react-native';
import VRModal from './VRModal';

describe('VRModal', () => {
    const setModalOpenMock = jest.fn();
    it('should call setModalOpen when closing', () => {
        const { getByTestId } = render(
            <VRModal modalOpen setModalOpen={setModalOpenMock}>
                <Text>Modal content</Text>
            </VRModal>
        );

        fireEvent.press(getByTestId('modal-header-close'));

        expect(setModalOpenMock).toHaveBeenCalledWith(false);
    });

    it('should render title', () => {
        const { getByText } = render(
            <VRModal modalOpen setModalOpen={setModalOpenMock} title="Modal">
                <Text>Modal content</Text>
            </VRModal>
        );

        expect(getByText('Modal')).toBeTruthy();
    });
});
