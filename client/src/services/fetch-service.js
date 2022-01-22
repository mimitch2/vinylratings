import _ from 'lodash';

const apiBaseUrl = process.env.REACT_APP_SERVER_ENDPOINT;

const request = async ({
    route,
    baseUrl = apiBaseUrl,
    method = 'GET',
    headers = {},
    params = {},
    payload = null
}) => {
    try {
        const requestUrl = `${baseUrl}/${route}${generateQueryParams({
            params
        })}`;
        const requestOptions = {
            method,
            headers
        };

        if (payload) {
            requestOptions.body = payload;
        }

        const data = await fetch(requestUrl, requestOptions);
        const response = await data.json();

        return response;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('error', error);
    }

    return null;
};

const generateQueryParams = ({ params }) => {
    return _.reduce(
        params,
        (result, val, key) => {
            let encodedKeyValue = '';
            const dividerSymbol = result ? '&' : '?';

            if (_.isArray(val) && val.length) {
                const arrayString = `[${val.join(',').replace(',', '||')}]`;

                encodedKeyValue = `${encodeURIComponent(key)}=${arrayString}`;
            } else {
                encodedKeyValue = `${encodeURIComponent(
                    key
                )}=${encodeURIComponent(val)}`;
            }

            return `${result}${dividerSymbol}${encodedKeyValue}`;
        },
        ''
    );
};

export const apiService = {
    request
};
