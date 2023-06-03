import { formProps } from './form';

export interface authenticationProps {
  formOptions: formProps;
  buttonText: string;
  link: string;
  linkText?: string;
  questionText?: string;
  errorMessage?: string;
  loadingStatus: boolean;
}
