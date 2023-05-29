import { instanceAxios } from 'api/configuration/axios';
import { AxiosError, AxiosPromise } from 'axios';
import { Method } from 'axios';

type RequestConfig<T> = {
  url: string;
  method?: Method | string;
  params?: any;
  data?: T;
};

export async function request<T>(config: RequestConfig<T>): AxiosPromise<T> {
  try {
    const data = await instanceAxios(config);
    return data;
  } catch (e) {
    const error = e as AxiosError;

    error.message = getErrorMessage(error);
  }
}
