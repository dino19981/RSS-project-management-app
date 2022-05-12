import { useEffect, useState } from 'react';
import { instanceAxios } from '../HTTP/configuration';
import { TBoard } from '../models/board';
import { TColumn } from '../models/column';
import { fieldsType } from '../models/form';
import { responses } from '../models/useAxios';

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

  const [data, setData] = useState<responses>();
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [isError, setIsError] = useState(false);

  const request = async (requestOptions: requestOptions = defaultRequestOptions) => {
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

  useEffect(() => {
    if (!hookOptions?.dontFetchAtMount) {
      request();
    }
  }, []);

  return { data, isLoading, isError, request };
};
