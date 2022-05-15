import { AxiosResponse } from 'axios';
import { instanceAxios } from '../HTTP/configuration';
import { TBoard } from '../models/board';

export const getBoards = async (): Promise<TBoard[]> => {
  const userResponse: AxiosResponse<TBoard[]> = await instanceAxios.get(`/boards`);
  return userResponse.data;
};

export const getSingleBoard = async (id: string): Promise<TBoard> => {
  const userResponse: AxiosResponse<TBoard> = await instanceAxios.get(`/boards/${id}`);
  return userResponse.data;
};
