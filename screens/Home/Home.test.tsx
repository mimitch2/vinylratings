import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './Home';
import * as useAuth from 'hooks/useAuth';
import { flushPromises } from 'test/testing.helpers';

describe('Home', () => {
    const navigationMock = {
        setParams: jest.fn()
    };
    const routeMock = {
        params: {
            auth: 'fakeToken'
        }
    };

    let state: {
        data: {
            username: string | null;
        };
        loading: boolean;
    };
    let getAuthMock: () => Promise<void>;

    beforeEach(() => {
        state = {
            data: {
                username: 'testUser'
            },
            loading: false
        };
        getAuthMock = jest.fn();
        jest.spyOn(useAuth, 'useAuth').mockReturnValue({
            // @ts-ignore
            state,
            getAuth: getAuthMock
        });
    });

    it('should render loading when no data has been returned', async () => {
        state = {
            data: {
                username: null
            },
            loading: true
        };
        jest.spyOn(useAuth, 'useAuth').mockReturnValue({
            // @ts-ignore
            state,
            getAuth: getAuthMock
        });

        const { getByTestId } = render(
            <Home navigation={navigationMock} route={routeMock} />
        );

        expect(getByTestId('loading')).toBeTruthy();
    });

    it('should call getAuth and AsyncStorage when logging out', async () => {
        const asyncSpy: jest.SpyInstance<Promise<void>> = jest.spyOn(
            AsyncStorage,
            'removeItem'
        );
        const alertSpy: jest.SpyInstance<void> = jest.spyOn(Alert, 'alert');

        const { getByText } = render(
            <Home navigation={navigationMock} route={routeMock} />
        );

        const logoutButton = getByText('Logout');
        fireEvent.press(logoutButton);

        expect(alertSpy).toHaveBeenCalledTimes(1);
        alertSpy.mock.calls[0][2][1].onPress();

        await flushPromises();

        expect(asyncSpy).toHaveBeenCalledWith('auth');
        expect(getAuthMock).toHaveBeenCalledTimes(1);
    });

    it('should call Linking when logging in', async () => {
        global.fetch = jest.fn();
        const linkSpy: jest.SpyInstance<Promise<string>> = jest.spyOn(
            Linking,
            'openURL'
        );
        state = {
            data: {
                username: null
            },
            loading: false
        };
        jest.spyOn(useAuth, 'useAuth').mockReturnValue({
            // @ts-ignore
            state,
            getAuth: getAuthMock
        });

        const { getByText } = render(
            <Home navigation={navigationMock} route={routeMock} />
        );

        const loginButton = getByText('Login');
        fireEvent.press(loginButton);

        await flushPromises();

        expect(linkSpy).toHaveBeenCalledTimes(1);
    });
});
