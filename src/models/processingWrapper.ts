import { AxiosError } from 'axios';
import { TBoard } from './board';

export type processingWrapperProps = {
  isLoading: boolean;
  error: null | AxiosError;
  children: React.ReactNode;
  items?: TBoard[];
};
