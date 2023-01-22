import { Platform } from 'react-native';

export const usePlatform = () => {
    return { isIOS: Platform.OS === 'ios' };
};
