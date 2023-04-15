import React, { useEffect, useContext } from 'react';
import { Alert, Linking, Image, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
// @ts-ignore
import { REACT_APP_SERVER_ENDPOINT } from '@env';

import { VRContainer, VRLoading, VRText, VRButton, VRFooter } from 'components';
import { DisabledContext } from 'context';
import { useAuth } from 'hooks/useAuth';
import { client } from '../../ApolloProviderWrapper';
import { useFetch } from 'hooks';
import { FONTS } from 'constants/index';
import { Nav } from 'types';

type Params = {
    auth?: string;
};

export type Route = {
    params: Params;
};

const Home = ({ navigation, route }: { navigation: Nav; route: Route }) => {
    const {
        state: { data, loading },
        getAuth
    } = useAuth(route, navigation);
    const { setDisabled } = useContext(DisabledContext);
    const { getFetchResponse } = useFetch();

    useEffect(() => {
        if (data?.username && setDisabled) {
            setDisabled(false);
        }
    }, [setDisabled, data?.username]);

    if (loading) {
        return <VRLoading />;
    }

    const isLoggedIn = !!data?.username;

    const handleLogin = async () => {
        const redirectTo = await getFetchResponse({
            url: `${REACT_APP_SERVER_ENDPOINT}/auth`,
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
                routes: [{ name: 'Home', params: { auth: '' } }]
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
        <>
            <VRContainer startAnimation scrollable={false}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <VRText size={45} fontFamily={FONTS.heading}>
                        VINYL RATINGS
                    </VRText>
                    {/* <Image
                            source={require('../../images/home_logo.png')}
                            style={{ height: 300, width: 300 }}
                        /> */}
                </View>
            </VRContainer>
            <VRFooter>
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
            </VRFooter>
        </>
    );
};

export default Home;
