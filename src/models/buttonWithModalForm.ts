import { formProps } from './form';
import { modalProps } from './modal';
import { ButtonProps } from './button';

export interface buttonWithModalFormProps {
  formOptions?: formProps;
  buttonOptions: ButtonProps;
  modalOptions?: modalProps;
  modalState: { isModalActive: boolean; setIsModalActive: (state: boolean) => void };
  questionText?: string;
}
