import { formProps } from './form';

export interface authentificationProps {
  formOptions: formProps;
  buttonText: string;
  link: string;
  linkText: string;
  questionText: string;
  errorMessage?: boolean | string;
  loadingStatus: boolean;
}
