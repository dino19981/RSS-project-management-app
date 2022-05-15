import { AxiosResponse } from 'axios';
import { instanceAxios } from '../HTTP/configuration';
import { TColumn } from '../models/column';

export const getColumns = async (boardId: string): Promise<TColumn[]> => {
  const userResponse: AxiosResponse<TColumn[]> = await instanceAxios.get(
    `/boards/${boardId}/columns`
  );
  return userResponse.data;
};

export const getSingleColumn = async (boardId: string, columnId: string): Promise<TColumn> => {
  const userResponse: AxiosResponse<TColumn> = await instanceAxios.get(
    `/boards/${boardId}/columns/${columnId}`
  );
  return userResponse.data;
};

export const addColumn = async (
  boardId: string,
  body: Omit<TColumn, 'id' | 'tasks'>
): Promise<Omit<TColumn, 'tasks'>> => {
  const userResponse: AxiosResponse<Omit<TColumn, 'tasks'>> = await instanceAxios.post(
    `/boards/${boardId}/columns`,
    body
  );
  return userResponse.data;
};
