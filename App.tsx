import React from 'react';
import { SafeAreaView, useColorScheme, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import VRTabs from 'navigation/VRTabs/VRTabs';
import ApolloProviderWrapper from './ApolloProviderWrapper';
import useCachedResources from 'hooks/useCachedResources';
import * as eva from '@eva-design/eva';
import {
    ApplicationProvider,
    Layout,
    ModalService
} from '@ui-kitten/components';
import { default as lightTheme } from 'constants/themeLight.json';
import { default as darkTheme } from 'constants/themeDark.json';
import { default as mapping } from 'constants/mapping.json';
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
    ModalService.setShouldUseTopInsets = true;
    // const scheme = useColorScheme();

    // const theme = scheme === 'dark' ? darkTheme : lightTheme;
    // console.log('🚀 ~ file: App.tsx:50 ~ App ~ theme:', {
    //     ...eva[scheme ?? 'dark'],
    //     ...theme
    // });

    return isLoadingComplete ? (
        <ApolloProviderWrapper>
            {/* <IconRegistry icons={[VRIconsPack()]} /> */}
            <ApplicationProvider
                {...eva}
                theme={{ ...eva.dark, ...darkTheme }}
                // @ts-ignore
                customMapping={mapping}
            >
                <Layout style={styles.flex}>
                    <SafeAreaView style={styles.flex}>
                        <NavigationContainer linking={linking}>
                            <VRTabs />
                        </NavigationContainer>
                    </SafeAreaView>
                </Layout>
            </ApplicationProvider>
        </ApolloProviderWrapper>
    ) : null;
};

const styles = StyleSheet.create({
    flex: {
        flex: 1
    }
});

export default App;
