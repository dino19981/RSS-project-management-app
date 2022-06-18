import { AxiosError } from 'axios';
import { TBoard } from './board';

export type processingWrapperProps = {
  isLoading: boolean;
  isError: false | AxiosError;
  errortext: string;
  children: React.ReactNode;
  items?: TBoard[];
};
