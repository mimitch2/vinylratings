import { MockedProvider } from '@apollo/react-testing';
import { renderHook, waitFor } from '@testing-library/react-native';

import { useGetFolders, GET_FOLDERS } from './useGetFolders';
import { foldersMock } from 'test';

describe('useGetFolders', () => {
    const getFoldersMock = [
        {
            request: {
                query: GET_FOLDERS
            },
            result: {
                data: {
                    getFolders: foldersMock
                },
                loading: false,
                error: null
            }
        }
    ];
    it('should set folders and folder to mocked response', async () => {
        const Wrapper = ({ children }: { children: any }) => (
            <MockedProvider mocks={getFoldersMock} addTypename={false}>
                {children}
            </MockedProvider>
        );

        const { result } = renderHook(() => useGetFolders(), {
            wrapper: Wrapper
        });

        await waitFor(() => {
            expect(result.current.folders).toStrictEqual(foldersMock);
            expect(result.current.folder).toStrictEqual(foldersMock[0]);
        });
    });
});
