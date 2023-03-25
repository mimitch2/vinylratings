/* eslint-disable no-undef */
import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

// jest.mock('react-native-permissions', () =>
//     require('react-native-permissions/mock')
// );

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

global.AbortController = jest.fn(() => ({
    abort: jest.fn()
}));

jest.mock('react-native-image-zoom-viewer', () => 'ImageViewer');

jest.mock('@react-navigation/native', () => ({
    __esModule: true,
    ...jest.requireActual('@react-navigation/native')
}));

jest.mock('expo-linking', () => {
    const module = {
        ...jest.requireActual('expo-linking'),
        createURL: jest.fn()
    };

    return module;
});

// jest.mock('@apollo/client', () => ({
//     __esModule: true,
//     ...jest.requireActual('@apollo/client'),
//     useQuery: jest.fn(),
//     useLazyQuery: jest.fn(),
//     useMutation: jest.fn(),
//     gql: jest.fn()
// }));

// // include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
// jest.mock('react-native-reanimated', () => {
//     const Reanimated = require('react-native-reanimated/mock');

//     // The mock for `call` immediately calls the callback which is incorrect
//     // So we override it with a no-op
//     Reanimated.default.call = () => {};

//     return Reanimated;
// });

// // Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
