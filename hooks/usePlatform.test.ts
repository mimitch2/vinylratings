import { renderHook } from '@testing-library/react-native';
import { Platform } from 'react-native';

import { usePlatform } from './usePlatform';

describe('usePlatform', () => {
    it('should return true for isIOS', () => {
        Platform.OS = 'ios';

        const { result } = renderHook(() => usePlatform());

        expect(result.current.isIOS).toStrictEqual(true);
    });

    it('should return false for isIOS', () => {
        Platform.OS = 'android';

        const { result } = renderHook(() => usePlatform());

        expect(result.current.isIOS).toStrictEqual(false);
    });
});
