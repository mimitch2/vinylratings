// import React from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { MockedProvider } from '@apollo/react-testing';
// import { renderHook, waitFor, act } from '@testing-library/react-native';
// import { GraphQLError } from 'graphql';

// import { useAuth, GET_USER } from './useAuth';

// describe('useAuth', () => {
//     const navigationMock = {
//         setParams: jest.fn(),
//         navigate: jest.fn(),
//         setOptions: jest.fn(),
//         dispatch: jest.fn()
//     };

//     const routeMock = {
//         params: {
//             auth: 'fakeToken'
//         }
//     };

//     const successMocks = [
//         {
//             request: {
//                 query: GET_USER,
//                 variables: {
//                     auth: 'fakeToken'
//                 }
//             },
//             result: {
//                 data: {
//                     getUser: {
//                         _id: 5678,
//                         username: 'fakeName',
//                         token: 'fakeToken',
//                         avatarUrl: 'fakeUrl',
//                         discogsUserId: 1234,
//                         releasesRated: 0,
//                         vinylRatings: {
//                             updatedAt: 'fakeDate'
//                         }
//                     }
//                 }
//             }
//         }
//     ];

//     it('should return user data and set auth to async storage', async () => {
//         const asyncSpy: jest.SpyInstance<Promise<void>> = jest.spyOn(
//             AsyncStorage,
//             'setItem'
//         );

//         const Wrapper = ({ children }: { children: any }) => (
//             <MockedProvider mocks={successMocks}>{children}</MockedProvider>
//         );

//         const { result } = renderHook(
//             () => useAuth(routeMock, navigationMock),
//             {
//                 wrapper: Wrapper
//             }
//         );

//         await waitFor(() => {
//             expect(asyncSpy).toHaveBeenCalledWith('auth', 'fakeToken');
//             expect(result.current.state.data).toEqual(
//                 successMocks[0].result.data.getUser
//             );
//         });
//     });

//     it('should throw error and unset async storage auth', async () => {
//         const errorMocks = [
//             {
//                 request: {
//                     query: GET_USER,
//                     variables: {
//                         auth: 'fakeToken'
//                     }
//                 },
//                 result: {
//                     errors: [new GraphQLError('error')]
//                 }
//             }
//         ];

//         const asyncSpy: jest.SpyInstance<Promise<void>> = jest.spyOn(
//             AsyncStorage,
//             'removeItem'
//         );
//         const Wrapper = ({ children }: { children: any }) => (
//             <MockedProvider mocks={errorMocks}>{children}</MockedProvider>
//         );

//         await act(async () => {
//             renderHook(() => useAuth(routeMock, navigationMock), {
//                 wrapper: Wrapper
//             });
//         });

//         await waitFor(() => {
//             expect(asyncSpy).toHaveBeenCalledWith('auth');
//         });
//     });

//     describe('after timeout runs', () => {
//         beforeAll(() => {
//             jest.useFakeTimers({ legacyFakeTimers: true });
//         });
//         it('should set loading to false', async () => {
//             const Wrapper = ({ children }: { children: any }) => (
//                 <MockedProvider mocks={successMocks}>{children}</MockedProvider>
//             );

//             const { result } = renderHook(
//                 () => useAuth(routeMock, navigationMock),
//                 {
//                     wrapper: Wrapper
//                 }
//             );

//             act(() => {
//                 jest.runAllTimers();
//             });

//             await waitFor(() => {
//                 expect(result.current.state.loading).toStrictEqual(false);
//             });
//         });
//     });
// });

import { renderHook, act } from '@testing-library/react-native';
import { useAuth, authReducer, initialState, State, Action } from './useAuth';
import { useLazyQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@apollo/client', () => ({
    useLazyQuery: jest.fn()
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn()
}));

const mockUseLazyQuery = useLazyQuery as jest.Mock;
const mockAsyncStorageGetItem = AsyncStorage.getItem as jest.Mock;
const mockAsyncStorageSetItem = AsyncStorage.setItem as jest.Mock;
const mockAsyncStorageRemoveItem = AsyncStorage.removeItem as jest.Mock;

describe('useAuth', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should use authReducer with initial state', () => {
        const getUser = jest.fn();
        mockUseLazyQuery.mockReturnValue([getUser]);

        renderHook(() => useAuth());

        expect(mockUseLazyQuery).toHaveBeenCalledWith(expect.anything());
    });

    it('should correctly update state with authReducer', () => {
        const actionLoading: Action = { type: 'LOADING', payload: true };
        const actionFetched: Action = {
            type: 'FETCHED',
            payload: { username: 'test_user' }
        };
        const actionError: Action = {
            type: 'ERROR',
            payload: new Error('test error')
        };

        expect(authReducer(initialState, actionLoading)).toEqual({
            ...initialState,
            loading: true
        });

        expect(authReducer(initialState, actionFetched)).toEqual({
            ...initialState,
            data: actionFetched.payload
        });

        expect(authReducer(initialState, actionError)).toEqual({
            ...initialState,
            error: actionError.payload
        });
    });

    it('should get and set auth from AsyncStorage', async () => {
        const getUser = jest.fn();
        mockUseLazyQuery.mockReturnValue([getUser]);
        mockAsyncStorageGetItem.mockResolvedValue('test_auth');

        const { result } = renderHook(() => useAuth());

        await act(async () => {
            await result.current.getAuth();
        });

        expect(mockAsyncStorageGetItem).toHaveBeenCalledWith('auth');
        expect(mockAsyncStorageSetItem).toHaveBeenCalledWith(
            'auth',
            'test_auth'
        );
    });

    it('should remove auth from AsyncStorage on error', async () => {
        const getUser = jest.fn();
        mockUseLazyQuery.mockReturnValue([getUser]);
        mockAsyncStorageGetItem.mockResolvedValue('test_auth');
        getUser.mockRejectedValue(new Error('test error'));

        const { result } = renderHook(() => useAuth());

        await act(async () => {
            await result.current.getAuth();
        });

        expect(mockAsyncStorageRemoveItem).toHaveBeenCalledWith('auth');
    });
});
