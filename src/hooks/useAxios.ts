import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { AdditionalRequestOptions, hookOptionsType, requestOptions } from '../models/useAxios';
import { request as axiosRequest } from 'api/configuration/request';

export type UseAxiosReturn<T> = {
  data: T | undefined;
  isLoading: boolean;
  isError: AxiosError | null;
  request: (requestOptions?: AdditionalRequestOptions) => Promise<AxiosResponse<T> | undefined>;
};

export const useAxios = <T>(
  defaultRequestOptions: requestOptions,
  hookOptions?: hookOptionsType
): UseAxiosReturn<T> => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(!hookOptions?.dontFetchAtMount);
  const [isError, setIsError] = useState<null | AxiosError>(null);

  const request = useCallback(
    async (additionalRequestOptions: AdditionalRequestOptions = defaultRequestOptions) => {
      setIsLoading(true);
      setIsError(null);

      try {
        const requestOptions = { ...defaultRequestOptions, ...additionalRequestOptions };
        const response = await axiosRequest<T>(requestOptions);

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
    },
    []
  );

  useEffect(() => {
    if (!hookOptions?.dontFetchAtMount) {
      request();
    }
  }, []);

  return { data, isLoading, isError, request };
};
