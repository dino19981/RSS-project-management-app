import React from 'react';

export interface modalProps {
  formId?: string;
  children: React.ReactNode;
  submitBtnName?: string;
  handleCloseModal: () => void;
  handler?: () => void;
}
