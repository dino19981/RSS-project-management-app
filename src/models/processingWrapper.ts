import { AxiosError } from 'axios';

export type processingWrapperProps = {
  isLoading: boolean;
  isError: false | AxiosError;
  errortext: string;
  children: React.ReactNode;
};
