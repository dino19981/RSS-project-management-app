import { buttonProps } from './button';
import {
  autorizationSchemaType,
  registrationSchemaType,
  TBoardCreateSchema,
  TColumnCreateSchema,
} from './schemas';

export interface formProps {
  schema: fieldsType;
  initialValues: fieldsType;
  fields: formField[];
  isHaveButton?: boolean;
  formId?: string;
  onSubmit: (values: fieldsType) => void;
  buttonOptions?: buttonProps;
  formClassName?: string;
}

interface formField {
  name: string;
  labelText?: string;
  inputClass?: string;
  labelClass?: string;
  type?: string;
  errorMessage?: string;
  placeholder?: string;
}

export type TDeleteBoard = { confirm: boolean };
export type fieldsType =
  | registrationSchemaType
  | autorizationSchemaType
  | TBoardCreateSchema
  | TColumnCreateSchema;
