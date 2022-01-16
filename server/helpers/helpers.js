const _ = require('lodash');

module.exports = {
    generateQueryParams: ({ params }) => {
        return _.reduce(
            params,
            (result, val, key) => {
                let encodedKeyValue = '';
                const dividerSymbol = result ? '&' : '?';

                if (_.isArray(val)) {
                    const arrayString = `[${val.join(',').replace(',', '||')}]`;

                    encodedKeyValue = `${encodeURIComponent(
                        key
                    )}=${arrayString}`;
                } else {
                    encodedKeyValue = `${encodeURIComponent(
                        key
                    )}=${encodeURIComponent(val)}`;
                }

                return `${result}${dividerSymbol}${encodedKeyValue}`;
            },
            ''
        );
    }
};
