import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { renderHook, waitFor, act } from '@testing-library/react-native';

import { useList } from './useList';
import { GET_COLLECTION } from 'src/screens/authorized/Collection/collectionQueries';
import { foldersMock, flushPromises, collectionMock } from 'src/test';
import { GraphQLError } from 'graphql';

describe('useList', () => {
    it('should return correct data for Collection list', async () => {
        const request = {
            query: GET_COLLECTION,
            variables: {
                page: 1,
                per_page: 25,
                sort: 'added',
                sort_order: 'desc',
                offset: 0,
                limit: 25,
                folder: 0
            }
        };

        const fetchMock: MockedResponse = {
            request,
            result: {
                data: collectionMock
            }
        };

        const refetchMock: MockedResponse = {
            request,
            newData: () => {
                return {
                    data: collectionMock
                };
            }
        };

        const collectionMocks = [fetchMock, refetchMock];

        const scrollToIndexMock = jest.fn();
        const Wrapper = ({ children }: { children: any }) => (
            <MockedProvider mocks={collectionMocks} addTypename={false}>
                {children}
            </MockedProvider>
        );

        const { result } = renderHook(
            () =>
                useList({
                    scrollViewRef: {
                        // @ts-ignore
                        current: {
                            scrollToIndex: scrollToIndexMock
                        }
                    },
                    QUERY: GET_COLLECTION,
                    queryKey: 'getCollection',
                    folder: foldersMock[0]
                }),
            {
                wrapper: Wrapper
            }
        );

        act(async () => {
            await flushPromises();
        });

        await waitFor(() => {
            expect(result.current.data).toStrictEqual(collectionMock);
            expect(scrollToIndexMock).toBeCalledTimes(1);
            expect(scrollToIndexMock).toHaveBeenLastCalledWith({
                index: 0,
                animated: false
            });
        });
    });

    xit('should throw Error', async () => {
        const error = 'ooooops';
        const request = {
            query: GET_COLLECTION,
            variables: {
                page: 1,
                per_page: 25,
                sort: 'added',
                sort_order: 'desc',
                offset: 0,
                limit: 25,
                folder: 0
            }
        };

        const fetchMock: MockedResponse = {
            request,
            result: {
                data: collectionMock,
                errors: [new GraphQLError(error)]
            }
        };

        const refetchMock: MockedResponse = {
            request,
            newData: () => {
                return {
                    data: collectionMock,
                    errors: [new GraphQLError(error)]
                };
            }
        };

        const collectionMocks = [fetchMock, refetchMock];

        const scrollToIndexMock = jest.fn();
        const Wrapper = ({ children }: { children: any }) => (
            <MockedProvider mocks={collectionMocks} addTypename={false}>
                {children}
            </MockedProvider>
        );

        const { result } = renderHook(
            () =>
                useList({
                    scrollViewRef: {
                        // @ts-ignore
                        current: {
                            scrollToIndex: scrollToIndexMock
                        }
                    },
                    QUERY: GET_COLLECTION,
                    queryKey: 'getCollection',
                    folder: foldersMock[0]
                }),
            {
                wrapper: Wrapper
            }
        );

        act(async () => {
            await flushPromises();
        });

        await waitFor(() => {
            console.log(
                '🚀 ~ file: useList.test.tsx:125 ~ it ~ result',
                result
            );

            expect(result.current.error).toStrictEqual(error);
        });
    });
});
