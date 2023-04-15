import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

const useCachedResources = () => {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    // Load any resources or data that we need prior to rendering the app
    useEffect(() => {
        const loadResourcesAndDataAsync = async () => {
            try {
                SplashScreen.preventAutoHideAsync();

                // Load fonts
                await Font.loadAsync({
                    'ArchivoNarrow-Regular': require('../assets/fonts/ArchivoNarrow-Regular.ttf'),
                    'ArchivoNarrow-Bold': require('../assets/fonts/ArchivoNarrow-Bold.ttf'),
                    'ArchivoNarrow-Italic': require('../assets/fonts/ArchivoNarrow-Italic.ttf'),
                    'ArchivoNarrow-BoldItalic': require('../assets/fonts/ArchivoNarrow-BoldItalic.ttf'),
                    'TradeGothic-Bold-Extended': require('../assets/fonts/Trade-Gothic-LT-Std-Bold-Extended.otf'),
                    LetsJazz: require('../assets/fonts/LetsJazz.otf')
                });
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                SplashScreen.hideAsync();
            }
        };

        loadResourcesAndDataAsync();
    }, []);

    return isLoadingComplete;
};

export default useCachedResources;
