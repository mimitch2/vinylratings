import { useEffect, useReducer, useCallback, useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Nav } from 'types';
import { Route } from 'screens/Home/Home';

export const GET_USER = gql`
    query GetUser($auth: String!) {
        getUser(auth: $auth) {
            _id
            username
            token
            avatarUrl
            discogsUserId
            releasesRated
            vinylRatings {
                updatedAt
            }
        }
    }
`;

export interface State {
    data?: User;
    error?: Error;
    loading: boolean;
}

type Action =
    | { type: 'LOADING'; payload: boolean }
    | { type: 'FETCHED'; payload: User }
    | { type: 'ERROR'; payload: Error };

export const initialState = {
    error: undefined,
    data: undefined,
    loading: false
};

const authReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'LOADING':
            return { ...state, loading: action.payload };
        case 'FETCHED':
            return { ...state, data: action.payload };
        case 'ERROR':
            return { ...initialState, error: action.payload };
        default:
            return state;
    }
};

export const useAuth = (route?: Route, navigation?: Nav | undefined) => {
    const [getUser] = useLazyQuery(GET_USER);
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [minimumLoading, setMinimumLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setMinimumLoading(true);
        }, 1000);
    }, []);

    const getAuth = useCallback(async () => {
        dispatch({ type: 'LOADING', payload: true });

        if (route?.params?.auth) {
            await AsyncStorage.setItem('auth', route.params.auth);
            navigation?.setParams({ auth: '' });
        }

        const localStorageAuth = (await AsyncStorage.getItem('auth')) ?? '';

        const { data, error } = await getUser({
            variables: { auth: localStorageAuth },
            fetchPolicy: route?.params?.auth ? 'network-only' : 'cache-first',
            errorPolicy: 'all'
        });

        if (error) {
            await AsyncStorage.removeItem('auth');

            await getUser({
                variables: { auth: '' },
                fetchPolicy: 'network-only'
            });

            return dispatch({ type: 'ERROR', payload: error as Error });
        }

        dispatch({ type: 'FETCHED', payload: data?.getUser });

        if (minimumLoading) {
            dispatch({ type: 'LOADING', payload: false });
        }
    }, [getUser, route?.params, navigation, minimumLoading]);

    useEffect(() => {
        getAuth();
    }, [getAuth]);

    return { state, getAuth };
};
