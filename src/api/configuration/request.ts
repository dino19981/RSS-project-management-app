import { instanceAxios } from 'api/configuration/axios';
import { getErrorMessage } from 'api/errors/errorHandling';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Method } from 'axios';

type RequestConfig<T> = {
  url: string;
  method?: Method | string;
  params?: AxiosRequestConfig['params'];
  data?: T;
};

export async function request<T>(config: RequestConfig<T>): Promise<AxiosResponse<T>> {
  try {
    const data = await instanceAxios(config);

    return data;
  } catch (e) {
    const error = e as AxiosError;

    throw new AxiosError(getErrorMessage(error));
  }
}
