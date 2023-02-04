import React, { useEffect, useContext } from 'react';
import { Alert, Linking, Image, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Config from 'react-native-config';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';

import { VRContainer, VRLoading, VRText, VRButton } from 'components';
import { DisabledContext } from 'navigation/VRTabs/VRTabs';
import { useAuth } from 'hooks/useAuth';
import { client } from '../../App';
import { useFetch } from 'hooks';

const Home = ({ navigation, route }: NativeStackScreenProps<any>) => {
    const {
        state: { data, loading },
        getAuth
    } = useAuth(route, navigation);
    const { setDisabled } = useContext(DisabledContext);
    const { getFetchResponse } = useFetch();

    useEffect(() => {
        data?.username && setDisabled && setDisabled(false);
    }, [setDisabled, data?.username]);

    if (loading) {
        return <VRLoading />;
    }

    const isLoggedIn = !!data?.username;

    const handleLogin = async () => {
        const redirectTo = await getFetchResponse({
            url: `http://localhost:8080/auth`,
            type: 'text'
        });

        Linking.openURL(redirectTo);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('auth');
        await getAuth();
        setDisabled && setDisabled(true);

        await client.clearStore();
        client.cache.gc();
        navigation.dispatch(
            CommonActions.reset({
                routes: [{ name: 'Home' }]
            })
        );
    };

    const handleLogout = () => {
        Alert.alert('Are you sure you want to log out?', '', [
            {
                text: 'Cancel'
            },
            {
                text: 'Yes',
                onPress: logout
            }
        ]);
    };

    return (
        <VRContainer startAnimation>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <VRText fontWeight="bold" size={60}>
                    VinylRatings
                </VRText>
                <Image
                    source={require('../../images/home_logo.png')}
                    style={{ height: 300, width: 300 }}
                />
                {isLoggedIn ? (
                    <VRButton
                        trackID="home_screen-logout"
                        title="Logout"
                        onPress={handleLogout}
                    />
                ) : (
                    <VRButton
                        trackID="home_screen-login"
                        title="Login"
                        onPress={handleLogin}
                    />
                )}
            </View>
        </VRContainer>
    );
};

export default Home;
