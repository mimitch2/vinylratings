module.exports = {
    preset: 'jest-expo',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$': require.resolve(
            './node_modules/react-native/jest/assetFileTransformer.js'
        ),
        'react-native-restart': '<rootDir>/__mocks__/react-native-restart.js'
    },
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?expo-barcode-scanner|expo-camera|native-base|react-native-svg|expo-splash-screen|expo-asset|expo-font|expo-constants|expo-linking|react-native-webview|expo-modules-core|expo-barcode-scanner|react-native-image-pan-zoom|react-native-image-zoom-viewer|expo-haptics|react-native-swipe-gestures|react-native-calendars|react-native|@react-native(-community)?)/)'
    ],
    setupFilesAfterEnv: [
        '<rootDir>/jest.setup.js',
        '@testing-library/jest-native/extend-expect'
    ],
    collectCoverage: true,
    collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**'],
    coverageReporters: ['clover', 'json', 'lcov', 'text', 'html'],
    globals: {
        window: {}
    },
    testEnvironment: 'node'
};
