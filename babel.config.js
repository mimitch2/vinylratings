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
                        context: './context',
                        helpers: './helpers',
                        hooks: './hooks',
                        images: './images',
                        navigation: './navigation',
                        screens: './screens',
                        styles: './styles',
                        svgs: './svgs',
                        test: './test',
                        types: './types'
                    }
                }
            ]
        ]
    };
};
