import React from 'react';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'cross-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import { REACT_APP_SERVER_ENDPOINT } from '@env';

const authLink = setContext(async (_, { headers }) => {
    const auth = await AsyncStorage.getItem('auth');

    return {
        headers: {
            ...headers,
            authorization: auth ? `Bearer ${auth}` : ''
        }
    };
});

const httpLink = createHttpLink({
    uri: `${REACT_APP_SERVER_ENDPOINT}/graphql`,
    fetch
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    getCollection: {
                        keyArgs: false,
                        merge(existing = null, incoming) {
                            if (!existing) {
                                return incoming;
                            }

                            return {
                                ...incoming,
                                releases: [
                                    ...existing.releases,
                                    ...incoming.releases
                                ]
                            };
                        }
                    },
                    getWantList: {
                        keyArgs: false,
                        merge(existing = null, incoming) {
                            if (!existing) {
                                return incoming;
                            }

                            return {
                                ...incoming,
                                wants: [...existing.wants, ...incoming.wants]
                            };
                        }
                    },
                    getSearch: {
                        keyArgs: ['search'],
                        merge(existing = null, incoming) {
                            if (!existing) {
                                return incoming;
                            }

                            return {
                                ...incoming,
                                results: [
                                    ...existing.results,
                                    ...incoming.results
                                ]
                            };
                        }
                    },
                    getMasterReleaseVersions: {
                        keyArgs: false,
                        merge(existing = null, incoming) {
                            if (!existing) {
                                return incoming;
                            }

                            return {
                                ...incoming,
                                versions: [
                                    ...existing.versions,
                                    ...incoming.versions
                                ]
                            };
                        }
                    }
                }
            }
        }
    })
});

const ApolloProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
