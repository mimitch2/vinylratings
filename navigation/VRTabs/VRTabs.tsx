import {
    createBottomTabNavigator,
    BottomTabBarProps
} from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState, useMemo, useContext } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme, useNavigation } from '@react-navigation/native';
import {
    BottomNavigation,
    BottomNavigationTab,
    BottomNavigationProps,
    TopNavigation,
    TopNavigationAction,
    Divider,
    Layout,
    Text
} from '@ui-kitten/components';

import { VRIcon, VRText } from 'components';
import {
    ArtistDetails,
    Collection,
    Home,
    MasterRelease,
    Release,
    Search,
    Versions,
    WantList
} from 'screens';
import { ThemeColors, Theme } from 'styles';
import { DisabledContext } from 'context';
import { FONTS } from 'constants/index';
import { TextCategory } from 'types';

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
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
        <Layout>
            <BottomNavigation
                selectedIndex={selectedIndex}
                onSelect={(index) => {
                    setSelectedIndex(index);
                    navigation.navigate(ROUTES[index].routeName);
                }}
            >
                {ROUTES.map(({ routeName, icon, index }) => {
                    const isDisabled = !!(disabled && index);
                    return (
                        <BottomNavigationTab
                            key={routeName}
                            icon={() => <VRIcon type={icon} size="lg" />}
                            title={() => <VRText>{routeName}</VRText>}
                            disabled={isDisabled}
                            style={[
                                styles(colors).tabBar,
                                {
                                    opacity: isDisabled ? 0.5 : 1
                                }
                            ]}
                        />
                    );
                    //         const isCurrentScreen = state.index === index;
                    //         const color = isCurrentScreen ? colors.primary : colors.text;

                    //         const onPress = () => {
                    //             if (!isCurrentScreen) {
                    //                 navigation.navigate(routeName);
                    //             }
                    //         };

                    //         const isDisabled = Boolean(disabled && index);

                    //         return (
                    //             <TouchableOpacity
                    //                 disabled={isDisabled}
                    //                 key={routeName}
                    //                 accessibilityRole="button"
                    //                 accessibilityState={
                    //                     isCurrentScreen ? { selected: true } : {}
                    //                 }
                    //                 onPress={onPress}
                    //                 style={[
                    //                     styles(colors).tabBar,
                    //                     {
                    //                         opacity: isDisabled ? 0.4 : 1
                    //                     }
                    //                 ]}
                    //             >
                    //                 <View
                    //                     style={{
                    //                         alignItems: 'center'
                    //                     }}
                    //                 >
                    //                     <VRIcon type={icon} color={color} />
                    //                     <VRText size={14} color={color}>
                    //                         {routeName}
                    //                     </VRText>
                    //                 </View>
                    //             </TouchableOpacity>
                    //         );
                })}
            </BottomNavigation>
        </Layout>
    );
};

const Tabs = () => {
    const { disabled } = useContext(DisabledContext);

    return (
        <Tab.Navigator
            initialRouteName="Tabs"
            tabBar={(props: TabBarProps) => (
                <TabBar {...props} disabled={disabled} />
            )}
        >
            {ROUTES.map(({ Component, routeName, options }) => {
                return (
                    <Tab.Screen
                        key={routeName}
                        name={routeName}
                        component={Component}
                        options={{
                            ...options,
                            headerMode: 'screen',
                            header: () => (
                                <TopNavigationSimpleUsageShowcase
                                    title={routeName}
                                    back={false}
                                />
                            )
                        }}
                    />
                );
            })}
        </Tab.Navigator>
    );
};

const BackAction = (): React.ReactElement => {
    const navigation = useNavigation();
    return (
        <TopNavigationAction
            icon={() => <VRIcon type="chevronRight" />}
            onPress={() => navigation.goBack()}
        />
    );
};

export const TopNavigationSimpleUsageShowcase = ({
    title,
    back = true
}: {
    title: string;
    back?: boolean;
}): React.ReactElement => (
    <>
        <TopNavigation
            accessoryLeft={back ? BackAction : undefined}
            title={() => <VRText category={TextCategory.h4}>{title}</VRText>}
            alignment="center"
        />
        <Divider />
    </>
);

const VRTabs = () => {
    const [disabled, setDisabled] = useState(true);
    const value = useMemo(
        () => ({
            disabled,
            setDisabled
        }),
        [disabled]
    );

    return (
        <DisabledContext.Provider value={value}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Tabs"
                    component={Tabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Artist"
                    component={ArtistDetails}
                    options={{
                        headerMode: 'screen',
                        header: () => (
                            <TopNavigationSimpleUsageShowcase title="Artist" />
                        )
                    }}
                />
                <Stack.Screen
                    name="Versions"
                    component={Versions}
                    options={{
                        headerMode: 'screen',
                        header: () => (
                            <TopNavigationSimpleUsageShowcase title="Pressings" />
                        )
                    }}
                />
                <Stack.Screen
                    name="VersionRelease"
                    component={Release}
                    options={{
                        headerMode: 'screen',
                        header: () => (
                            <TopNavigationSimpleUsageShowcase title="Pressings" />
                        )
                    }}
                />
                <Stack.Screen
                    name="Release"
                    component={Release}
                    options={{
                        headerMode: 'screen',
                        header: () => (
                            <TopNavigationSimpleUsageShowcase title="Release" />
                        )
                    }}
                />
                <Stack.Screen
                    name="Master"
                    component={MasterRelease}
                    options={{
                        headerMode: 'screen',
                        header: () => (
                            <TopNavigationSimpleUsageShowcase title="Master" />
                        )
                    }}
                />
            </Stack.Navigator>
        </DisabledContext.Provider>
    );
};

const styles = (colors: ThemeColors) =>
    StyleSheet.create({
        tabBar: {
            // flex: 1,
            paddingTop: 10
        },
        header: {
            // backgroundColor: colors.background,
            borderBottomColor: colors.primaryFaded,
            borderBottomWidth: 0.5
        },
        hederTitle: {
            fontFamily: FONTS.primary,
            // fontWeight: 'bold',
            // color: colors.text,
            fontSize: 20
        },
        tabBarContainer: {
            flexDirection: 'row',
            borderTopColor: colors.primaryFaded,
            borderTopWidth: 0.5
        },
        contentStyle: {
            // backgroundColor: colors.background,
        }
    });

export default VRTabs;
