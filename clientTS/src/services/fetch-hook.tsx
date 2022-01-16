import { useState, useEffect } from 'react';
import _ from 'lodash';

interface ITypes {
    route: string;
    baseUrl?: string | undefined;
    method?: string | undefined;
    headers?: {} | undefined;
    params?: {} | undefined;
    payload?: {} | null;
    dependencies?: never[] | undefined;
}

export const useApiService = ({
    route,
    baseUrl = process.env.REACT_APP_SERVER_ENDPOINT,
    method = 'GET',
    headers = {},
    params = {},
    payload = null,
    dependencies = []
}: ITypes) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fetchedData, setFetchedData] = useState(null);

    const requestOptions: {
        method: string;
        headers: {};
        body: null | {};
    } = {
        method,
        headers,
        body: null
    };

    if (payload) {
        requestOptions.body = payload;
    }

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const res = await fetch(
                `${baseUrl}/${route}${generateQueryParams({
                    params
                })}`,
                requestOptions
            );

            const json = await res.json();
            setFetchedData(json);
            setIsLoading(false);
        } catch (err) {
            setError(err);
            console.warn('error', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, dependencies);

    return [{ fetchedData, isLoading, error }, fetchData];
};

const generateQueryParams = ({ params }: { params: { key: string; value: string | [] } }): string => {
    return _.reduce(
        params,
        (result: any, val: string | [], key: string) => {
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
