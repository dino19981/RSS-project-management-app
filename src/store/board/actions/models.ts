import { TColumn } from '../../../models/column';
import { fieldsType } from '../../../models/form';
import { TTask } from '../../../models/task';

export type createColumnArgs = {
  boardId: string;
  values: fieldsType;
};

export type AllIds = {
  boardId: string;
  columnId: string;
  taskId: string;
};

export type updateColumnArgs = {
  boardId: string;
  columnId: string;
  values: Pick<TColumn, 'title' | 'order'>;
};

export type createTaskArgs = {
  boardId: string;
  columnId: string;
  values: Pick<TTask, 'title' | 'description' | 'userId'>;
};

export type TAddFileToTask = {
  formData: FormData;
  taskId: string;
  fileName: string;
};
