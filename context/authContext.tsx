import { Dispatch, SetStateAction, createContext } from 'react';

interface Context {
    username: string | null;
    name: string | null;
    discogsUserInfoUri: string | null;
    token: string | null;
    discogsUserId: number | null;
    discogsReleasesRated: number | null;
    releasesRated: number | null;
    avatarUrl: string | null;
    createdAt: string | null;
    washedOnField: string;
    updatedAt: string | null;
    setAuth: Dispatch<SetStateAction<Context>> | null;
}

export const AuthContext = createContext<Context>({
    username: null,
    name: null,
    discogsUserInfoUri: null,
    token: null,
    discogsUserId: null,
    discogsReleasesRated: null,
    releasesRated: null,
    avatarUrl: null,
    washedOnField: '',
    createdAt: null,
    updatedAt: null,
    setAuth: () => null
});
