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
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.js'],
            rules: {
                // '@typescript-eslint/no-shadow': ['error'],
                // 'no-shadow': 'off'
                // 'no-undef': 'off'
                'import/no-unresolved': [1, { commonjs: true, amd: true }],
                // 'import/named': 2,
                'import/namespace': 1,
                'import/default': 2,
                // 'import/export': 2
                'no-unused-vars': 'off'
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
