import {
    createBottomTabNavigator,
    BottomTabBarProps
} from '@react-navigation/bottom-tabs';
import React, { useState, useMemo, useContext } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import {
    BottomNavigation,
    BottomNavigationTab,
    TopNavigation,
    TopNavigationAction,
    Layout
} from '@ui-kitten/components';

import { VRIcon, VRText, VRDivider } from 'components';
import {
    ArtistDetails,
    Collection,
    Copies,
    Home,
    MasterRelease,
    Release,
    Search,
    Versions,
    WantList,
    Settings
} from 'screens';
import { DisabledContext } from 'context';
import { Colors } from 'types';

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
            headerShown: false
        }
    },
    {
        index: 3,
        routeName: 'Want',
        icon: 'want',
        Component: WantList
    }
];

const TabBar = ({ navigation, disabled }: TabBarProps) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
        <Layout>
            <BottomNavigation
                selectedIndex={selectedIndex}
                onSelect={(index) => {
                    setSelectedIndex(index);
                    navigation.navigate(ROUTES[index].routeName);
                }}
                indicatorStyle={{ width: '70%', marginBottom: 5 }}
            >
                {ROUTES.map(({ routeName, icon, index }) => {
                    const isDisabled = !!(disabled && index);
                    const isSelected = selectedIndex === index;
                    return (
                        <BottomNavigationTab
                            key={routeName}
                            icon={() => (
                                <VRIcon
                                    type={icon}
                                    size="md"
                                    color={
                                        isSelected
                                            ? Colors.primary
                                            : Colors.text
                                    }
                                />
                            )}
                            title={() => (
                                <VRText
                                    status={isSelected ? 'primary' : 'basic'}
                                    styleOverride={{ marginTop: 3 }}
                                >
                                    {routeName}
                                </VRText>
                            )}
                            disabled={isDisabled}
                            style={{
                                opacity: isDisabled ? 0.5 : 1
                            }}
                        />
                    );
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
                                <HeaderBar title={routeName} back={false} />
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
            icon={() => <VRIcon type="chevronLeft" />}
            onPress={() => navigation.goBack()}
        />
    );
};

export const HeaderBar = ({
    title,
    back = true
}: {
    title: string;
    back?: boolean;
}): React.ReactElement => (
    <>
        <TopNavigation
            accessoryLeft={back ? BackAction : undefined}
            title={() => <VRText fontType="h5">{title.toUpperCase()}</VRText>}
            alignment="center"
        />
        <VRDivider />
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
                        header: () => <HeaderBar title="Artist" />
                    }}
                />
                <Stack.Screen
                    name="Versions"
                    component={Versions}
                    options={{
                        headerMode: 'screen',
                        header: () => <HeaderBar title="Pressings" />
                    }}
                />
                <Stack.Screen
                    name="VersionRelease"
                    component={Release}
                    options={{
                        headerMode: 'screen',
                        header: () => <HeaderBar title="Pressings" />
                    }}
                />
                <Stack.Screen
                    name="Release"
                    component={Release}
                    options={{
                        headerMode: 'screen',
                        header: () => <HeaderBar title="Release" />
                    }}
                />
                <Stack.Screen
                    name="Master"
                    component={MasterRelease}
                    options={{
                        headerMode: 'screen',
                        header: () => <HeaderBar title="Master" />
                    }}
                />
                <Stack.Screen
                    name="Copies"
                    component={Copies}
                    options={{
                        headerMode: 'screen',
                        header: () => <HeaderBar title="My Copies" />
                    }}
                />
                <Stack.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        headerMode: 'screen',
                        header: () => <HeaderBar title="Settings" />
                    }}
                />
            </Stack.Navigator>
        </DisabledContext.Provider>
    );
};

export default VRTabs;
