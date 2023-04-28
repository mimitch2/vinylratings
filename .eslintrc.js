module.exports = {
    root: true,
    extends: [
        '@react-native-community',
        'plugin:import/recommended',
        'eslint:recommended',
        // 'plugin:import/errors',
        // 'plugin:import/warnings',
        'plugin:import/typescript'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    ignorePatterns: ['coverage/**'],
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.js'],
            rules: {
                // '@typescript-eslint/no-shadow': ['error'],
                // 'no-shadow': 'off'
                // 'no-undef': 'off'
                'import/no-unresolved': 'off',
                // 'import/named': 2,
                'import/namespace': 1,
                'import/default': 2,
                // 'import/export': 2
                'no-unused-vars': 'off',
                '@typescript-eslint/no-unused-vars': ['warn'],
                'comma-dangle': 'off',
                'react-native/no-inline-styles': 'off',
                'import/no-named-as-default': 'warn',
                'react/no-unstable-nested-components': [
                    'off',
                    {
                        allowAsProps: true,
                        customValidators:
                            [] /* optional array of validators used for propTypes validation */
                    }
                ],
                'import/no-named-as-default-member': 'off'
            },
            settings: {
                'import/ignore': ['react-native']
            }
        }
    ]
    // settings: {
    //     'import/resolver': {
    //         'babel-module': {},
    //         typescript: {},
    //         node: {
    //             paths: ['.'],
    //             extensions: ['.js', '.jsx', '.ts', '.tsx']
    //         }
    //     }
    //     // 'import/extensions': ['.js', '.js', '.ts', '.tsx']
    // }
};
