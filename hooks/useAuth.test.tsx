import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MockedProvider } from '@apollo/react-testing';
import { renderHook, waitFor, act } from '@testing-library/react-native';
import { GraphQLError } from 'graphql';

import { useAuth, GET_USER } from './useAuth';
import { flushPromises } from '../test/testing.helpers';

describe('useAuth', () => {
    const navigationMock = {
        setParams: jest.fn()
    };

    const routeMock = {
        params: {
            auth: 'fakeToken'
        }
    };

    const successMocks = [
        {
            request: {
                query: GET_USER,
                variables: {
                    auth: 'fakeToken'
                }
            },
            result: {
                data: {
                    getUser: {
                        _id: 5678,
                        username: 'fakeName',
                        token: 'fakeToken',
                        avatarUrl: 'fakeUrl',
                        discogsUserId: 1234,
                        releasesRated: 0,
                        vinylRatings: null
                    }
                }
            }
        }
    ];

    it('should return user data and set auth to async storage', async () => {
        const asyncSpy: jest.SpyInstance<Promise<void>> = jest.spyOn(
            AsyncStorage,
            'setItem'
        );
        const Wrapper = ({ children }: { children: any }) => (
            <MockedProvider mocks={successMocks}>{children}</MockedProvider>
        );

        const { result } = renderHook(
            () => useAuth(routeMock, navigationMock),
            {
                wrapper: Wrapper
            }
        );

        await waitFor(() => {
            expect(result.current.state.data).toEqual(
                successMocks[0].result.data.getUser
            );
            expect(asyncSpy).toHaveBeenCalledWith('auth', 'fakeToken');
        });
    });

    it('should throw error and unset async storage auth', async () => {
        const errorMocks = [
            {
                request: {
                    query: GET_USER,
                    variables: {
                        auth: 'fakeToken'
                    }
                },
                result: {
                    errors: [new GraphQLError('error')]
                }
            }
        ];

        const asyncSpy: jest.SpyInstance<Promise<void>> = jest.spyOn(
            AsyncStorage,
            'removeItem'
        );
        const Wrapper = ({ children }: { children: any }) => (
            <MockedProvider mocks={errorMocks}>{children}</MockedProvider>
        );

        renderHook(() => useAuth(routeMock, navigationMock), {
            wrapper: Wrapper
        });

        await waitFor(() => {
            expect(asyncSpy).toHaveBeenCalledWith('auth');
        });
    });

    describe('after timeout runs', () => {
        beforeAll(() => {
            jest.useFakeTimers({ legacyFakeTimers: true });
        });

        it('should set loading to false', async () => {
            const Wrapper = ({ children }: { children: any }) => (
                <MockedProvider mocks={successMocks}>{children}</MockedProvider>
            );

            const { result } = renderHook(
                () => useAuth(routeMock, navigationMock),
                {
                    wrapper: Wrapper
                }
            );

            act(() => {
                jest.runAllTimers();
            });

            await waitFor(() => {
                expect(result.current.state.loading).toStrictEqual(false);
            });
        });
    });
});
