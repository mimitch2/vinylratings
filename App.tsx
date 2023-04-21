import React from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import VRTabs from 'navigation/VRTabs/VRTabs';
import ApolloProviderWrapper from './ApolloProviderWrapper';
import { DarkTheme, DefaultTheme } from 'styles';
import useCachedResources from 'hooks/useCachedResources';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import { default as lightTheme } from 'constants/themeLight.json';
import { default as darkTheme } from 'constants/themeDark.json';

export const linking = {
    prefixes: [Linking.createURL('/')],
    config: {
        screens: {
            Tabs: {
                screens: { Home: 'home' }
            }
        }
    }
};

const App = () => {
    const isLoadingComplete = useCachedResources();
    const scheme = useColorScheme();

    // const theme = scheme === 'dark' ? darkTheme : lightTheme;

    return isLoadingComplete ? (
        <ApolloProviderWrapper>
            <ApplicationProvider
                {...eva}
                theme={{ ...eva[scheme ?? 'dark'], ...darkTheme }}
            >
                <Layout
                    style={{
                        flex: 1
                    }}
                >
                    <SafeAreaView
                        style={{
                            flex: 1
                        }}
                    >
                        <NavigationContainer linking={linking}>
                            <VRTabs />
                        </NavigationContainer>
                    </SafeAreaView>
                </Layout>
            </ApplicationProvider>
        </ApolloProviderWrapper>
    ) : null;
};

export default App;
