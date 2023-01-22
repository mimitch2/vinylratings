import { render, fireEvent } from '@testing-library/react-native';

import VRRateModal from './VRRateModal';

describe('VRRateModal', () => {
    const setModalOpenMock = jest.fn();
    const onPressMock = jest.fn();
    it('should call setModalOpen when pressing close', () => {
        const { getByTestId } = render(
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
        const view = render(
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
        const { getByText, getByTestId } = render(
            <VRRateModal
                setModalOpen={setModalOpenMock}
                modalOpen
                onPress={onPressMock}
            />
        );

        ['clarity', 'quietness', 'flatness'].forEach((category) => {
            fireEvent.press(getByTestId(`star-${category}-3`));
        });

        fireEvent.changeText(getByTestId('input'), 'nice');
        fireEvent.press(getByText('Submit'));

        expect(onPressMock).toHaveBeenLastCalledWith({
            clarity: 3,
            flatness: 3,
            quietness: 3,
            notes: 'nice'
        });
    });
});
