import { useEffect, useState } from 'react';
import { instanceAxios } from '../HTTP/configuration';
import { fieldsType } from '../models/form';

type params = {
  [key: string]: string;
};

type requestOptions = {
  url?: string;
  method?: string;
  params?: params;
  data?: fieldsType;
};

type hookOptions = {
  dontFetchAtMount?: boolean;
};

export const useAxios = (defaultRequestOptions: requestOptions, hookOptions?: hookOptions) => {
  const initialLoading = hookOptions?.dontFetchAtMount ? false : true;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>();
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [isError, setIsError] = useState(false);

  const request = async (requestOptions = defaultRequestOptions) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await instanceAxios(requestOptions);

      if (requestOptions.method === 'get') {
        setData(response.data);
      }

      return response;
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = (params: requestOptions = defaultRequestOptions) => {
    return request(params);
  };

  useEffect(() => {
    if (!hookOptions?.dontFetchAtMount) {
      request();
    }
  }, []);

  return { data, isLoading, isError, refetch };
};
