import { render, fireEvent } from '@testing-library/react-native';

import { Folder } from 'types';
import VRReleaseOptionsModal from './VRReleaseOptionsModal';
import { SORT_BY_OPTIONS_WANT_LIST } from 'constants/index';

describe('VRReleaseOptionsModal', () => {
    const setSortMock = jest.fn();
    const setSortOrderMock = jest.fn();
    const setFolderMock = jest.fn();

    const folders: Folder[] = [
        {
            name: 'All',
            id: 0,
            count: 100
        },
        {
            name: 'Indie/Alt',
            id: 12345,
            count: 50
        },
        {
            name: 'Americana',
            id: 33445,
            count: 50
        }
    ];

    it('should not render folder icon if no folder', () => {
        const { queryByTestId } = render(
            <VRReleaseOptionsModal
                sortOrder="asc"
                sort="added"
                setSort={setSortMock}
                setSortOrder={setSortOrderMock}
                setFolder={setFolderMock}
            />
        );

        expect(queryByTestId('folder-toggle')).toBeFalsy();
    });

    describe('when sort modal is open', () => {
        let view: any;

        beforeEach(() => {
            view = render(
                <VRReleaseOptionsModal
                    sortOrder="asc"
                    sort="added"
                    setSort={setSortMock}
                    setSortOrder={setSortOrderMock}
                    setFolder={setFolderMock}
                    folders={folders}
                    folder={folders[0]}
                    isWantList
                />
            );
            const { getByTestId } = view;

            fireEvent.press(getByTestId('sort-toggle'));
        });

        it.each(SORT_BY_OPTIONS_WANT_LIST)(
            `should render $label sort option`,
            ({ label }) => {
                const { getByText } = view;

                expect(getByText(label)).toBeTruthy();
            }
        );

        it('should call setSort when pressing on sort option', () => {
            const { getByText } = view;
            fireEvent.press(getByText('Year'));

            expect(setSortMock).toHaveBeenCalledWith('year');
        });
    });

    describe('when folder modal is open', () => {
        let view: any;

        beforeEach(() => {
            view = render(
                <VRReleaseOptionsModal
                    sortOrder="asc"
                    sort="added"
                    setSort={setSortMock}
                    setSortOrder={setSortOrderMock}
                    setFolder={setFolderMock}
                    folders={folders}
                    folder={folders[0]}
                />
            );
            const { getByTestId } = view;

            fireEvent.press(getByTestId('folder-toggle'));
        });

        it.each(folders)(
            'should render $name folder option',
            ({ name, count }) => {
                const { getByText } = view;

                expect(getByText(`${name} (${count})`)).toBeTruthy();
            }
        );

        it('should call setFolder when pressed', () => {
            const { getByText } = view;

            fireEvent.press(getByText('Americana (50)'));

            expect(setFolderMock).toHaveBeenCalledWith(folders[2]);
        });
    });

    describe('sort order', () => {
        it('should set sort order when pressed', () => {
            const { getByTestId } = render(
                <VRReleaseOptionsModal
                    sortOrder="asc"
                    sort="added"
                    setSort={setSortMock}
                    setSortOrder={setSortOrderMock}
                    setFolder={setFolderMock}
                    folders={folders}
                    folder={folders[0]}
                />
            );

            fireEvent.press(getByTestId('sort-order'));

            expect(setSortOrderMock).toHaveBeenCalledWith('desc');
        });
    });
});
