import { AxiosError } from 'axios';
import { Board } from 'shared/api/requests/board';

export type processingWrapperProps = {
  isLoading: boolean;
  error: null | AxiosError;
  children: React.ReactNode;
  items?: Board[];
};
