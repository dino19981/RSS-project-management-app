import { buttonProps } from './button';

export interface formProps {
  schema: schema | TBoardCreateSchema | TDeleteBoard;
  initialValues: schema | TBoardCreateSchema | TDeleteBoard;
  fields: formField[];
  isHaveButton?: boolean;
  formId?: string;
  onSubmit: (values: schema | TBoardCreateSchema | TColumnCreateSchema | TDeleteBoard) => void;

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

export type TColumnCreateSchema = {
  title: string;
};

export type TDeleteBoard = { confirm: boolean };
