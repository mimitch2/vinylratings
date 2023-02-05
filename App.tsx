// import { StatusBar } from 'expo-status-bar';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import {
//     ApolloClient,
//     InMemoryCache,
//     ApolloProvider,
//     createHttpLink
// } from '@apollo/client';
// import fetch from 'cross-fetch';
// import { setContext } from '@apollo/client/link/context';
// import VRTabs from 'navigation/VRTabs/VRTabs';

// import useColorScheme from './hooks/useColorScheme';
// import Navigation from './navigation';

// const authLink = setContext(async (_, { headers }) => {
//     return {
//         headers: {
//             ...headers,
//             authorization: `Bearer {"username":"eyJhbGciOiJIUzI1NiJ9.bWltaXRjaA.cqHFesLmzh1Bw1inSQ2pXg3jbx8Wk3qgRHwNj5UekPM","token":"eyJhbGciOiJIUzI1NiJ9.ZWdZbnpoQ1RkV2tjb3ZTcXRidk50ZXhoWk56TnlhaW94Q09GQ2hLWg.inqF_0Y1TN5zXee0dpppbrwp-5wPGo7rR917xi6mumQ","secret":"eyJhbGciOiJIUzI1NiJ9.cGpxcE9MRExockF4eWJ2ekJiSGJsaWdVbFpIeXJvT0l2amJTR0h1Vw.OLt6TKklMdiqplJhJMTd-K05F0EjfVycOyAI2X_Fs54"}`
//         }
//     };
// });

// const httpLink = createHttpLink({
//     uri: `http://localhost:8080/graphql`,
//     fetch
// });

// export const client = new ApolloClient({
//     link: authLink.concat(httpLink),
//     cache: new InMemoryCache()
// });

// export default function App() {
//     const isLoadingComplete = useCachedResources();
//     const colorScheme = useColorScheme();

//     if (!isLoadingComplete) {
//         return null;
//     } else {
//         return (
//             <SafeAreaProvider>
//                 <ApolloProvider client={client}>
//                     <VRTabs />
//                 </ApolloProvider>
//                 <StatusBar />
//             </SafeAreaProvider>
//         );
//     }
// }

import React from 'react';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink
} from '@apollo/client';
import fetch from 'cross-fetch';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';

import VRTabs from 'navigation/VRTabs/VRTabs';
import { DarkTheme, DefaultTheme } from 'styles';
import { setContext } from '@apollo/client/link/context';
import useCachedResources from './hooks/useCachedResources';

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
    uri: `http://192.168.4.89:8080/graphql`,
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
                        keyArgs: false,
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

export const linking = {
    prefixes: [Linking.createURL('/')],
    config: {
        screens: {
            Home: 'home'
        }
    }
};

const App = () => {
    const isLoadingComplete = useCachedResources();
    const scheme = useColorScheme();

    return isLoadingComplete ? (
        <React.StrictMode>
            <ApolloProvider client={client}>
                <SafeAreaView
                    style={{
                        flex: 1,
                        backgroundColor:
                            scheme === 'dark'
                                ? DarkTheme.colors.background
                                : DefaultTheme.colors.background
                    }}
                >
                    <NavigationContainer
                        linking={linking}
                        theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
                    >
                        <VRTabs />
                    </NavigationContainer>
                </SafeAreaView>
            </ApolloProvider>
        </React.StrictMode>
    ) : null;
};

export default App;
