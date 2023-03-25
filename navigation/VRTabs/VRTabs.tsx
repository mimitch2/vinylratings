import {
    createBottomTabNavigator,
    BottomTabBarProps
} from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState, useMemo, useContext } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';

import { VRIcon, VRText } from 'components';
import { Collection, Home, Search, WantList, Release, Versions } from 'screens';
import { ThemeColors, Theme } from 'styles';
import { DisabledContext } from 'context';
import { FONTS } from 'constants/index';

type Routes = 'Collection' | 'Home' | 'Search' | 'Want';
interface TabBarProps extends BottomTabBarProps {
    disabled: boolean;
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ROUTES: {
    index: number;
    routeName: Routes;
    icon: 'collection' | 'home' | 'search' | 'want';
    Component: (props: NativeStackScreenProps<any>) => React.ReactElement;
    options?: any | undefined;
}[] = [
    {
        index: 0,
        routeName: 'Home',
        icon: 'home',
        Component: Home
    },
    {
        index: 1,
        routeName: 'Collection',
        icon: 'collection',
        Component: Collection
    },
    {
        index: 2,
        routeName: 'Search',
        icon: 'search',
        Component: Search,
        options: {
            header: () => null
        }
    },
    {
        index: 3,
        routeName: 'Want',
        icon: 'want',
        Component: WantList
    }
];

const TabBar = ({ navigation, state, disabled }: TabBarProps) => {
    const { colors }: Theme = useTheme();

    return (
        <View style={styles(colors).tabBarContainer}>
            {ROUTES.map(({ routeName, icon, index }) => {
                const isCurrentScreen = state.index === index;
                const color = isCurrentScreen ? colors.primary : colors.text;

                const onPress = () => {
                    if (!isCurrentScreen) {
                        navigation.navigate(routeName);
                    }
                };

                const isDisabled = Boolean(disabled && index);

                return (
                    <TouchableOpacity
                        disabled={isDisabled}
                        key={routeName}
                        accessibilityRole="button"
                        accessibilityState={
                            isCurrentScreen ? { selected: true } : {}
                        }
                        onPress={onPress}
                        style={[
                            styles(colors).tabBar,
                            {
                                opacity: isDisabled ? 0.4 : 1
                            }
                        ]}
                    >
                        <View
                            style={{
                                alignItems: 'center'
                            }}
                        >
                            <VRIcon type={icon} color={color} />
                            <VRText size={14} color={color}>
                                {routeName}
                            </VRText>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const Tabs = () => {
    const { disabled } = useContext(DisabledContext);
    const { colors }: Theme = useTheme();

    return (
        <Tab.Navigator
            initialRouteName="Tabs"
            tabBar={(props: TabBarProps) => (
                <TabBar {...props} disabled={disabled} />
            )}
            screenOptions={{
                headerTitleStyle: styles(colors).hederTitle,
                headerStyle: styles(colors).header
            }}
        >
            {ROUTES.map(({ Component, routeName, options }) => {
                return (
                    <Tab.Screen
                        key={routeName}
                        name={routeName}
                        component={Component}
                        options={options || {}}
                    />
                );
            })}
        </Tab.Navigator>
    );
};

const VRTabs = () => {
    const [disabled, setDisabled] = useState(true);
    const value = useMemo(
        () => ({
            disabled,
            setDisabled
        }),
        [disabled]
    );
    const { colors }: Theme = useTheme();

    return (
        <DisabledContext.Provider value={value}>
            <Stack.Navigator
                screenOptions={{
                    headerTitleStyle: styles(colors).hederTitle,
                    headerStyle: styles(colors).header,
                    contentStyle: styles(colors).contentStyle
                }}
            >
                <Stack.Screen
                    name="Tabs"
                    component={Tabs}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Versions"
                    component={Versions}
                    options={{
                        title: 'Pressings'
                    }}
                />
                <Stack.Screen
                    name="VersionRelease"
                    component={Release}
                    options={{
                        title: 'Pressing'
                    }}
                />
                <Stack.Screen
                    name="Release"
                    component={Release}
                    options={{
                        headerTitleStyle: styles(colors).hederTitle,
                        headerStyle: styles(colors).header,
                        contentStyle: styles(colors).contentStyle
                    }}
                />
            </Stack.Navigator>
        </DisabledContext.Provider>
    );
};

const styles = (colors: ThemeColors) =>
    StyleSheet.create({
        tabBar: {
            flex: 1,
            paddingTop: 10
        },
        header: {
            backgroundColor: colors.background,
            borderBottomColor: colors.primaryFaded,
            borderBottomWidth: 0.5
        },
        hederTitle: {
            fontFamily: FONTS.primary,
            fontWeight: 'bold',
            color: colors.text,
            fontSize: 20
        },
        tabBarContainer: {
            flexDirection: 'row',
            borderTopColor: colors.primaryFaded,
            borderTopWidth: 0.5
        },
        contentStyle: {
            backgroundColor: colors.background
        }
    });

export default VRTabs;

// type Routes = 'Collection' | 'Home' | 'Search' | 'Want';
// interface Context {
//     setDisabled: React.Dispatch<React.SetStateAction<boolean>> | null;
//     disabled: boolean;
// }

// interface TabBarProps extends BottomTabBarProps {
//     disabled: boolean;
// }
// export const DisabledContext = React.createContext<Context>({
//     setDisabled: null,
//     disabled: false
// });

// const Tab = createBottomTabNavigator();

// const ROUTES: {
//     index: number;
//     routeName: Routes;
//     icon: 'collection' | 'home' | 'search' | 'want';
//     Component: (props: NativeStackScreenProps<any>) => React.ReactElement;
//     options?: any | undefined;
// }[] = [
//     {
//         index: 0,
//         routeName: 'Home',
//         icon: 'home',
//         Component: Home
//     },
//     {
//         index: 1,
//         routeName: 'Collection',
//         icon: 'collection',
//         Component: Collection
//     },
//     {
//         index: 2,
//         routeName: 'Search',
//         icon: 'search',
//         Component: Search
//     },
//     {
//         index: 3,
//         routeName: 'Want',
//         icon: 'want',
//         Component: WantList
//     }
// ];

// const TabBar = ({ navigation, state, disabled }: TabBarProps) => {
//     const { colors }: Theme = useTheme();

//     return (
//         <View style={styles(colors).tabBarContainer}>
//             {ROUTES.map(({ routeName, icon, index }) => {
//                 const isCurrentScreen = state.index === index;
//                 const color = isCurrentScreen ? colors.primary : colors.text;

//                 const onPress = () => {
//                     if (!isCurrentScreen) {
//                         navigation.navigate(routeName);
//                     }
//                 };

//                 const isDisabled = Boolean(disabled && index);

//                 return (
//                     <TouchableOpacity
//                         disabled={isDisabled}
//                         key={routeName}
//                         accessibilityRole="button"
//                         accessibilityState={
//                             isCurrentScreen ? { selected: true } : {}
//                         }
//                         onPress={onPress}
//                         style={[
//                             styles(colors).tabBar,
//                             {
//                                 opacity: isDisabled ? 0.4 : 1
//                             }
//                         ]}
//                     >
//                         <View
//                             style={{
//                                 alignItems: 'center'
//                             }}
//                         >
//                             <VRIcon type={icon} color={color} />
//                             <VRText size={14} color={color}>
//                                 {routeName}
//                             </VRText>
//                         </View>
//                     </TouchableOpacity>
//                 );
//             })}
//         </View>
//     );
// };

// const CollectionStack = createNativeStackNavigator();
// const SearchStack = createNativeStackNavigator();
// const WantStack = createNativeStackNavigator();

// const CollectionScreenStack = () => {
//     const { colors }: Theme = useTheme();

//     return (
//         <CollectionStack.Navigator
//             screenOptions={{
//                 headerTitleStyle: styles(colors).hederTitle,
//                 headerStyle: styles(colors).header,
//                 contentStyle: styles(colors).contentStyle
//             }}
//         >
//             <CollectionStack.Screen
//                 name="CollectionStack"
//                 component={Collection}
//                 options={{
//                     title: 'Collection'
//                 }}
//             />
//             <CollectionStack.Screen
//                 name="Versions"
//                 component={Versions}
//                 options={{
//                     title: 'Pressings'
//                 }}
//             />
//             <CollectionStack.Screen
//                 name="VersionRelease"
//                 component={Release}
//                 options={{
//                     title: 'Pressing'
//                 }}
//             />
//             <CollectionStack.Screen
//                 name="Release"
//                 component={Release}
//                 options={{
//                     headerTitleStyle: styles(colors).hederTitle,
//                     headerStyle: styles(colors).header,
//                     contentStyle: styles(colors).contentStyle
//                 }}
//             />
//         </CollectionStack.Navigator>
//     );
// };

// const SearchScreenStack = () => {
//     const { colors }: Theme = useTheme();

//     return (
//         <SearchStack.Navigator
//             screenOptions={{
//                 headerTitleStyle: styles(colors).hederTitle,
//                 headerStyle: styles(colors).header,
//                 contentStyle: styles(colors).contentStyle
//             }}
//         >
//             <SearchStack.Screen
//                 name="SearchStack"
//                 component={Search}
//                 options={{
//                     title: 'Search'
//                 }}
//             />
//             <SearchStack.Screen
//                 name="Versions"
//                 component={Versions}
//                 options={{
//                     title: 'Pressings'
//                 }}
//             />
//             <SearchStack.Screen
//                 name="VersionRelease"
//                 component={Release}
//                 options={{
//                     title: 'Pressing'
//                 }}
//             />
//             <SearchStack.Screen
//                 name="Release"
//                 component={Release}
//                 options={{
//                     headerTitleStyle: styles(colors).hederTitle,
//                     headerStyle: styles(colors).header,
//                     contentStyle: styles(colors).contentStyle
//                 }}
//             />
//         </SearchStack.Navigator>
//     );
// };

// const WantScreenStack = () => {
//     const { colors }: Theme = useTheme();

//     return (
//         <WantStack.Navigator
//             screenOptions={{
//                 headerTitleStyle: styles(colors).hederTitle,
//                 headerStyle: styles(colors).header,
//                 contentStyle: styles(colors).contentStyle
//             }}
//         >
//             <WantStack.Screen
//                 name="WantStack"
//                 component={WantList}
//                 options={{
//                     title: 'Want'
//                 }}
//             />
//             <WantStack.Screen
//                 name="Versions"
//                 component={Versions}
//                 options={{
//                     title: 'Pressings'
//                 }}
//             />
//             <WantStack.Screen
//                 name="VersionRelease"
//                 component={Release}
//                 options={{
//                     title: 'Pressing'
//                 }}
//             />
//             <WantStack.Screen
//                 name="Release"
//                 component={Release}
//                 options={{
//                     headerTitleStyle: styles(colors).hederTitle,
//                     headerStyle: styles(colors).header,
//                     contentStyle: styles(colors).contentStyle
//                 }}
//             />
//         </WantStack.Navigator>
//     );
// };

// const VRTabs = () => {
//     const [disabled, setDisabled] = useState(true);
//     const value = useMemo(
//         () => ({
//             disabled,
//             setDisabled
//         }),
//         [disabled]
//     );
//     const { colors }: Theme = useTheme();

//     return (
//         <DisabledContext.Provider value={value}>
//             <Tab.Navigator
//                 initialRouteName="Home"
//                 tabBar={(props: TabBarProps) => (
//                     <TabBar {...props} disabled={disabled} />
//                 )}
//                 screenOptions={{
//                     headerTitleStyle: styles(colors).hederTitle,
//                     headerStyle: styles(colors).header,
//                     headerShown: false
//                 }}
//             >
//                 <Tab.Screen name={'Home'} component={Home} />
//                 <Tab.Screen
//                     name={'Collection'}
//                     component={CollectionScreenStack}
//                 />
//                 <Tab.Screen name={'Search'} component={SearchScreenStack} />
//                 <Tab.Screen name={'Want'} component={WantScreenStack} />
//             </Tab.Navigator>
//         </DisabledContext.Provider>
//     );
// };

// const styles = (colors: ThemeColors) =>
//     StyleSheet.create({
//         tabBar: {
//             flex: 1,
//             paddingTop: 10,
//             backgroundColor: colors.background
//         },
//         header: {
//             backgroundColor: colors.background,
//             borderBottomColor: colors.primaryFaded,
//             borderBottomWidth: 0.5
//         },
//         hederTitle: {
//             fontFamily: FONTS.primary,
//             fontWeight: 'bold',
//             color: colors.text,
//             fontSize: 20
//         },
//         tabBarContainer: {
//             flexDirection: 'row',
//             borderTopColor: colors.primaryFaded,
//             borderTopWidth: 0.5
//         },
//         contentStyle: {
//             backgroundColor: colors.background
//         }
//     });

// export default VRTabs;
