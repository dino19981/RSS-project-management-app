import { AxiosResponse } from 'axios';
import { instanceAxios } from '../HTTP/configuration';
import { TBoard } from '../models/board';

export const getBoards = async (): Promise<TBoard[]> => {
  const userResponse: AxiosResponse<TBoard[]> = await instanceAxios.get(`/boards`);
  return userResponse.data;
};
