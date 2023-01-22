import { render, fireEvent } from '@testing-library/react-native';

import VRImageModal from './VRImageModal';
import { DiscogsImage } from '../../types';

describe('VRImageModal', () => {
    const images: DiscogsImage[] = [
        {
            resource_url: `fakeUrl-`,
            height: 100,
            width: 100
        }
    ];
    const setModalOpenMock = jest.fn();

    it('should not render anything if modal is closed', () => {
        const { queryByTestId } = render(
            <VRImageModal
                images={images}
                modalOpen={false}
                setModalOpen={setModalOpenMock}
            />
        );

        expect(queryByTestId('close-button')).toBeFalsy();
    });

    it('should render modal contents if modal is open', () => {
        const { getByTestId } = render(
            <VRImageModal
                images={images}
                modalOpen
                setModalOpen={setModalOpenMock}
            />
        );

        expect(getByTestId('close-button')).toBeTruthy();
    });

    it('should call setModalOpen when close button is clicked', () => {
        const { getByTestId } = render(
            <VRImageModal
                images={images}
                modalOpen
                setModalOpen={setModalOpenMock}
            />
        );

        fireEvent.press(getByTestId('close-button'));

        expect(setModalOpenMock).toHaveBeenCalledWith(false);
    });
});
