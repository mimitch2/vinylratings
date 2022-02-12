import { useState, useEffect } from 'react';
import _ from 'lodash';

export const useApiService = ({
  route,
  baseUrl = process.env.REACT_APP_SERVER_ENDPOINT,
  method = 'GET',
  headers = {},
  params = {},
  payload = null,
  dependencies = []
}) => {
  console.log('🚀 ~ file: fetch-hook.js ~ line 13 ~ payload', payload);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);

  const requestOptions = {
    method,
    headers
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
        encodedKeyValue = `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
      }

      return `${result}${dividerSymbol}${encodedKeyValue}`;
    },
    ''
  );
};
