import { ButtonProps } from './button';
import { updatedUserInfo, userIdType } from './user';
import {
  autorizationSchemaType,
  registrationSchemaType,
  TBoardCreateSchema,
  TColumnCreateSchema,
  TColumnUpdateSchema,
  TDeleteBoard,
  TTaskCreateSchema,
} from './schemas';

export interface formProps {
  schema: fieldsType;
  initialValues: fieldsType;
  fields: formField[];
  isHaveButton?: boolean;
  formId?: string;
  onSubmit: (values: fieldsType) => void;
  buttonOptions?: ButtonProps;
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

interface uploadFile {
  file: string;
  taskId: string;
}

export type fieldsType =
  | registrationSchemaType
  | autorizationSchemaType
  | TBoardCreateSchema
  | TColumnCreateSchema
  | TColumnUpdateSchema
  | TTaskCreateSchema
  | TDeleteBoard
  | updatedUserInfo
  | uploadFile
  | userIdType
  | FormData;
