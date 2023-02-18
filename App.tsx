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
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import VRTabs from 'navigation/VRTabs/VRTabs';
import ApolloProviderWrapper from './ApolloProviderWrapper';
import { DarkTheme, DefaultTheme } from 'styles';
import useCachedResources from 'hooks/useCachedResources';

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
        <ApolloProviderWrapper>
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
        </ApolloProviderWrapper>
    ) : null;
};

export default App;
