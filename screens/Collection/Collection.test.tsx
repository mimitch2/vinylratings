import { render } from '@testing-library/react-native';

import { collectionMock } from 'test';
import Collection from './Collection';
import * as useList from 'hooks/useList';
import * as useGetFolders from 'hooks/useGetFolders';
import * as navigation from '@react-navigation/native';

describe('Collection', () => {
    let useListMock: any;
    let foldersMock: any;
    let useGetFoldersMock: any;

    const navigationMock = {
        setParams: jest.fn(),
        setOptions: jest.fn(),
        navigate: jest.fn()
    };

    beforeAll(() => {
        useListMock = {
            initialLoading: false,
            loading: false,
            reloading: false,
            loadingMore: false,
            data: collectionMock,
            error: undefined,
            sort: 'added',
            setSort: jest.fn(),
            onRefresh: jest.fn(),
            onLoadMore: jest.fn(),
            sortOrder: 'desc',
            setSortOrder: jest.fn()
        };

        foldersMock = [
            { id: 0, name: 'All', count: 3 },
            {
                id: 1,
                name: 'Americana',
                count: 3
            }
        ];

        useGetFoldersMock = {
            folders: foldersMock,
            folder: foldersMock[0],
            setFolder: jest.fn(),
            foldersLoading: false
        };
    });

    describe('when loading', () => {
        describe('when folders are loading', () => {
            beforeAll(() => {
                jest.spyOn(useGetFolders, 'useGetFolders').mockReturnValue(
                    useGetFoldersMock
                );
                jest.spyOn(useList, 'useList').mockReturnValue(useListMock);
                jest.spyOn(navigation, 'useRoute').mockReturnValue({
                    name: 'Collection'
                });
            });

            it('should render loading', () => {
                jest.spyOn(useGetFolders, 'useGetFolders').mockReturnValue({
                    ...useGetFoldersMock,
                    foldersLoading: true
                });
                const { getByTestId } = render(
                    <Collection navigation={navigationMock} />
                );

                expect(getByTestId('loading')).toBeTruthy();
            });
        });

        describe('when data is loading', () => {
            it('should render loading', () => {
                jest.spyOn(useList, 'useList').mockReturnValue({
                    ...useListMock,
                    initialLoading: true
                });

                const { getByTestId } = render(
                    <Collection navigation={navigationMock} />
                );

                expect(getByTestId('loading')).toBeTruthy();
            });
        });
    });

    describe('when not loading', () => {
        beforeAll(() => {
            jest.spyOn(useGetFolders, 'useGetFolders').mockReturnValue(
                useGetFoldersMock
            );
            jest.spyOn(useList, 'useList').mockReturnValue(useListMock);
            jest.spyOn(navigation, 'useRoute').mockReturnValue({
                name: 'Collection'
            });
        });

        it('should set header title with correct folder and count', () => {
            render(<Collection navigation={navigationMock} />);

            expect(navigationMock.setOptions).toHaveBeenCalledWith({
                title: 'Collection:All(3)'
            });
        });

        describe('when there are no collection items', () => {
            it('should render warning message', () => {
                jest.spyOn(useList, 'useList').mockReturnValueOnce({
                    ...useListMock,
                    data: {
                        ...useListMock.data,
                        getCollection: {
                            pagination:
                                useListMock.data.getCollection.pagination,
                            releases: []
                        }
                    }
                });
                const { getByText } = render(
                    <Collection navigation={navigationMock} />
                );

                expect(
                    getByText('There do not seem to be any items here')
                ).toBeTruthy();
            });
        });

        describe('when there is an error', () => {
            beforeAll(() => {
                jest.spyOn(useGetFolders, 'useGetFolders').mockReturnValue(
                    useGetFoldersMock
                );
                jest.spyOn(useList, 'useList').mockReturnValue({
                    ...useListMock,
                    error: { message: 'Yo!' }
                });
                jest.spyOn(navigation, 'useRoute').mockReturnValue({
                    name: 'Collection'
                });
            });

            it('should render error message', () => {
                const { getByText } = render(
                    <Collection navigation={navigationMock} />
                );

                expect(getByText('Yo!')).toBeTruthy();
            });
        });
    });
});
