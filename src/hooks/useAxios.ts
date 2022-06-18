import { AxiosError } from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { instanceAxios } from '../HTTP/configuration';
import { hookOptionsType, requestOptions, responses } from '../models/useAxios';

export const useAxios = (defaultRequestOptions: requestOptions, hookOptions?: hookOptionsType) => {
  const [data, setData] = useState<responses>();
  const [isLoading, setIsLoading] = useState(!hookOptions?.dontFetchAtMount);
  const [isError, setIsError] = useState<false | AxiosError>(false);

  const request = useCallback(async (requestOptions: requestOptions = defaultRequestOptions) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await instanceAxios(requestOptions);

      if (requestOptions.method === 'get') {
        setData(response.data);
      }

      return response;
    } catch (err) {
      const error = err as AxiosError;
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hookOptions?.dontFetchAtMount) {
      request();
    }
  }, []);

  return { data, isLoading, isError, request };
};
