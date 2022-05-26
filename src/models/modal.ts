import { AxiosError } from 'axios';
import React from 'react';

export interface modalProps {
  formId?: string;
  children?: React.ReactNode;
  submitBtnName?: string;
  handleCloseModal?: () => void;
  submitHandler?: () => void;
  isError?: false | AxiosError;
  errorText?: string;
  contentWrapperClassName?: string;
  isDontShowFooter?: boolean;
}
