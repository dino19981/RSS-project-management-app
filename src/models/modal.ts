import { AxiosError } from 'axios';
import React from 'react';

export interface modalProps {
  formId?: string;
  children: React.ReactNode;
  submitBtnName?: string;
  handleCloseModal?: () => void;
  isError?: false | AxiosError;
  errorText?: string;
}
