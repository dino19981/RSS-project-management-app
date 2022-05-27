import { AxiosError } from 'axios';
import { formProps } from './form';

export interface buttonWithModalFormProps {
  formOptions: formProps;
  buttonOptions: {
    btnClass?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
    text?: string;
    icon?: JSX.Element;
    handler?: () => void;
    formId?: string;
    isDisabled?: boolean;
  };
  modalState: { isModalActive: boolean; setIsModalActive: (state: boolean) => void };
  submitBtnName: string;
  isError?: false | AxiosError;
  errorText?: string;
}
