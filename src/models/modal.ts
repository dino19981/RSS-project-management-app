import { AxiosError } from 'axios';
import React from 'react';

export interface modalProps {
  formId?: string;
  children?: React.ReactNode;
  submitBtnName?: string;
  handleCloseModal?: () => void;
  submitHandler?: () => void;
  error?: null | AxiosError;
  contentWrapperClassName?: string;
  isDontShowFooter?: boolean;
}
