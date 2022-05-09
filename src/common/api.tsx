import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { TBoard } from '../models/board';

export const getBoards = async (config: AxiosRequestConfig = {}) => {
  const boardsURL = process.env.REACT_APP_SERVER_URL + '/boards';
  try {
    const response = await axios.get<TBoard[]>(boardsURL, config);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
    return err.message;
  }
};
