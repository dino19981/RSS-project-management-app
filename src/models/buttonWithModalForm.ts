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
  };
  modalState: { isModalActive: boolean; setIsModalActive: (state: boolean) => void };
  submitBtnName: string;
}
