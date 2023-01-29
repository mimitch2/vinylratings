import { render, fireEvent } from '@testing-library/react-native';
import * as navigation from '@react-navigation/native';

import VRReleaseCard from './VRReleaseCard';
import { collectionItemMock } from 'test';

describe('VRReleaseCard', () => {
    const onPressMock = jest.fn();
    afterEach(() => {
        jest.resetAllMocks();
    });
    describe('when item is from collection', () => {
        beforeEach(() => {
            jest.spyOn(navigation, 'useRoute').mockReturnValue({
                name: 'Collection'
            });
        });

        it('should render title and artist correctly', () => {
            const { getByText } = render(
                <VRReleaseCard
                    release={collectionItemMock}
                    onPress={onPressMock}
                />
            );

            expect(getByText('Townes Van Zandt')).toBeTruthy();
            expect(getByText('Our Mother The Mountain')).toBeTruthy();
        });
    });

    describe('when item is from want list', () => {
        beforeEach(() => {
            jest.spyOn(navigation, 'useRoute').mockReturnValue({
                name: 'Want'
            });
        });

        it('should render title and artist correctly', () => {
            const { getByText } = render(
                <VRReleaseCard
                    release={collectionItemMock}
                    onPress={onPressMock}
                />
            );

            expect(getByText('Townes Van Zandt')).toBeTruthy();
            expect(getByText('Our Mother The Mountain')).toBeTruthy();
        });
    });

    describe('when item is from search', () => {
        beforeEach(() => {
            jest.spyOn(navigation, 'useRoute').mockReturnValue({
                name: 'Search'
            });
        });

        it('should render title and artist correctly', () => {
            const { getByText } = render(
                <VRReleaseCard
                    release={collectionItemMock}
                    onPress={onPressMock}
                />
            );

            expect(getByText('Townes Van Zandt')).toBeTruthy();
            expect(getByText('Our Mother The Mountain')).toBeTruthy();
        });
    });

    describe('when there is no image url', () => {
        beforeEach(() => {
            jest.spyOn(navigation, 'useRoute').mockReturnValue({
                name: 'Collection'
            });
        });
        it('should render default SVG', () => {
            const releaseMock = {
                ...collectionItemMock,
                basic_information: {
                    ...collectionItemMock.basic_information,
                    thumb: null
                }
            };

            const { getByTestId } = render(
                <VRReleaseCard release={releaseMock} onPress={onPressMock} />
            );

            expect(getByTestId('image-default')).toBeTruthy();
        });
    });

    describe('when user presses card', () => {
        beforeEach(() => {
            jest.spyOn(navigation, 'useRoute').mockReturnValue({
                name: 'Collection'
            });
        });
        it('should call onPress', () => {
            const { getByText } = render(
                <VRReleaseCard
                    release={collectionItemMock}
                    onPress={onPressMock}
                />
            );

            fireEvent.press(getByText('Townes Van Zandt'));

            expect(onPressMock).toHaveBeenCalledTimes(1);
        });
    });
});
