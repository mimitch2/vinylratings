module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$': require.resolve(
            './node_modules/react-native/jest/assetFileTransformer.js'
        ),
        'react-native-restart': '<rootDir>/__mocks__/react-native-restart.js'
    },
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native-config|react-native-permissions|react-native-haptic-feedback|react-native-image-pan-zoom|react-native-image-zoom-viewer|react-native-swipe-gestures|react-native-calendars|react-native|@react-native(-community)?)/)'
    ],
    // setupFiles: ['<rootDir>/jest.setup.js'],
    setupFilesAfterEnv: [
        '<rootDir>/jest.setup.js',
        '@testing-library/jest-native/extend-expect'
    ],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**'],
    coverageReporters: ['clover', 'json', 'lcov', 'text', 'html'],
    globals: {
        window: {}
    }
};
