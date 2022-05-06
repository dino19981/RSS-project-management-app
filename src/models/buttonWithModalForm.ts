import { formProps } from './form';

export interface buttonWithModalFormProps {
  formOptions: formProps;
  buttonOptions: {
    type?: string;
    text?: string;
    icon?: React.ReactNode;
    handler?: () => void;
    formId?: string;
  };
  modalState: { isModalActive: boolean; setIsModalActive: (state: boolean) => void };
  submitBtnName: string;
}
