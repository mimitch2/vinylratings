import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { renderHook, waitFor } from '@testing-library/react-native';

import { useIsInCollection, IS_IN_COLLECTION } from './useIsInCollection';

describe('useIsInCollection', () => {
    let mocks: readonly MockedResponse<Record<string, any>>[];

    beforeAll(() => {
        mocks = [
            {
                request: {
                    query: IS_IN_COLLECTION,
                    variables: {
                        id: 1234
                    }
                },
                result: {
                    data: {
                        getReleaseInCollection: {
                            isInCollection: true,
                            releases: {
                                id: 1234,
                                date_added: '2023-01-14',
                                instance_id: 4567,
                                folder_id: 8910
                            }
                        }
                    }
                }
            }
        ];
    });
    it('should return correct data if release is in collection', async () => {
        const Wrapper = ({ children }: { children: any }) => (
            <MockedProvider mocks={mocks}>{children}</MockedProvider>
        );

        const { result } = renderHook(
            () => useIsInCollection({ releaseId: 1234 }),
            {
                wrapper: Wrapper
            }
        );

        await waitFor(() => {
            expect(result.current).toStrictEqual({
                isInCollection: true,
                releases: {
                    id: 1234,
                    date_added: '2023-01-14',
                    instance_id: 4567,
                    folder_id: 8910
                },
                isInCollectionLoading: false,
                isInCollectionError: undefined,
                refetchIsInCollection: expect.any(Function)
            });
        });
    });

    it('should not call if skip is true', async () => {
        const Wrapper = ({ children }: { children: any }) => (
            <MockedProvider mocks={mocks}>{children}</MockedProvider>
        );

        const { result } = renderHook(
            () => useIsInCollection({ releaseId: 1234, skip: true }),
            {
                wrapper: Wrapper
            }
        );

        await waitFor(() => {
            expect(result.current).toStrictEqual({
                isInCollection: false,
                releases: undefined,
                isInCollectionLoading: false,
                isInCollectionError: undefined,
                refetchIsInCollection: expect.any(Function)
            });
        });
    });
});
