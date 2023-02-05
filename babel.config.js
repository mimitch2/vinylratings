module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module:react-native-dotenv',
                {
                    moduleName: '@env',
                    path: '.env',
                    blacklist: null,
                    whitelist: null,
                    safe: false,
                    allowUndefined: true
                }
            ],
            [
                'module-resolver',
                {
                    root: ['./src'],
                    extensions: [
                        '.js',
                        '.jsx',
                        '.es',
                        '.es6',
                        '.mjs',
                        '.ts',
                        '.tsx'
                    ],
                    alias: {
                        components: './components',
                        constants: './constants',
                        helpers: './helpers',
                        hooks: './hooks',
                        navigation: './navigation',
                        screens: './screens',
                        svgs: './svgs',
                        test: './test',
                        styles: './styles',
                        images: './images'
                    }
                }
            ]
        ]
    };
};
