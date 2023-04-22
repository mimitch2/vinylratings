import React from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import VRTabs from 'navigation/VRTabs/VRTabs';
import ApolloProviderWrapper from './ApolloProviderWrapper';
import useCachedResources from 'hooks/useCachedResources';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import { default as darkTheme } from 'constants/themeDark.json';

// function createIconsMap() {
//     return new Proxy(
//         {},
//         {
//             get(target, name) {
//                 return IconProvider(name);
//             }
//         }
//     );
// }

// export const VRIconsPack = () => ({
//     name: 'vr-icons',
//     icons: createIconsMap()
// });

// const IconProvider = (name: IconType) => ({
//     toReactElement: (props) => <VRIcon type={name} {...props} />
// });

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
            {/* <IconRegistry icons={[VRIconsPack()]} /> */}
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
