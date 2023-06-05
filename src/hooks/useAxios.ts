import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState, useCallback, useRef, useLayoutEffect } from 'react';
import { AdditionalRequestOptions, hookOptionsType, requestOptions } from '../models/useAxios';
import { request as axiosRequest } from 'api/configuration/request';

export type UseAxiosReturn<T> = {
  data: T | undefined;
  isLoading: boolean;
  error: AxiosError | null;
  request: (requestOptions?: AdditionalRequestOptions) => Promise<AxiosResponse<T> | undefined>;
};

export const useAxios = <T>(
  defaultRequestOptions: requestOptions,
  hookOptions?: hookOptionsType
): UseAxiosReturn<T> => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(!hookOptions?.dontFetchAtMount);
  const [error, setError] = useState<null | AxiosError>(null);
  const defaultOptions = useRef(defaultRequestOptions);

  useLayoutEffect(() => {
    defaultOptions.current = defaultRequestOptions;
  }, [defaultRequestOptions]);

  const request = useCallback(
    async (additionalRequestOptions: AdditionalRequestOptions = defaultOptions.current) => {
      setIsLoading(true);
      setError(null);

      try {
        const requestOptions = { ...defaultOptions.current, ...additionalRequestOptions };

        const response = await axiosRequest<T>(requestOptions);

        if (requestOptions.method === 'get') {
          setData(response.data);
        }

        return response;
      } catch (err) {
        const error = err as AxiosError;
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!hookOptions?.dontFetchAtMount) {
      request();
    }
  }, []);

  return { data, isLoading, error, request };
};
