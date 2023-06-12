import { instanceAxios } from 'shared/api/configuration/axios';
import { commonErrorMessages } from 'shared/api/errors/errorHandling';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Method } from 'axios';

type RequestConfig<T> = {
  url: string;
  method?: Method | string;
  params?: AxiosRequestConfig['params'];
  data?: T;
};

export async function request<T>(
  config: RequestConfig<T>,
  errorMessageHandler?: (error: AxiosError) => string | undefined
): Promise<AxiosResponse<T>> {
  try {
    const data = await instanceAxios(config);

    return data;
  } catch (e) {
    const error = e as AxiosError;

    if (!error.response) {
      throw new AxiosError(commonErrorMessages.unknownError);
    }

    const errorMessage = errorMessageHandler && errorMessageHandler(error);

    throw new AxiosError(errorMessage || commonErrorMessages.unknownError);
  }
}
