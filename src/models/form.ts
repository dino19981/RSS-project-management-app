import { buttonProps } from './button';

export interface formProps {
  schema: schema | TBoardCreateSchema;
  initialValues: schema | TBoardCreateSchema;
  fields: formField[];
  isHaveButton?: boolean;
  formId?: string;
  onSubmit: (values: schema | TBoardCreateSchema) => void;
  buttonOptions: buttonProps;
}

interface formField {
  name: string;
  label?: string;
  inputClass?: string;
  labelClass?: string;
  type?: string;
  errorMessage?: string;
  placeholder?: string;
  selectClassName?: string;
}

export type schema = {
  name: string;
  id: number;
};

export type TBoardCreateSchema = {
  title: string;
};
