import { AxiosError } from 'axios';
import { TBoard } from './board';

export type processingWrapperProps = {
  isLoading: boolean;
  isError: null | AxiosError;
  errortext: string;
  children: React.ReactNode;
  items?: TBoard[];
};
