import { ButtonProps } from './button';
import { User } from './user';
import { autorizationSchemaType, registrationSchemaType } from './schemas';
import { TColumn } from './column';
import { TBoard } from './board';
import { TTask } from './task';

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
  | Pick<TBoard, 'title'>
  | Pick<TColumn, 'title'>
  | Pick<TColumn, 'title' | 'order'>
  | Omit<TTask, 'file'>
  | User
  | uploadFile
  | Pick<User, 'login'>
  | FormData;
