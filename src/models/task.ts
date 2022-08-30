import { TFile } from './file';
import { fieldsType } from './form';

export type createTaskData = fieldsType & {
  userId: string;
};

export type responseTask = {
  id: string;
  title: string;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
};

export type TTask = responseTask & {
  order: number;
  files: TFile[];
};

export type searchListTasks = TTask & { columnId: string; boardId: string };

export type taskProps = TGetBoardTask & {
  columnId: string;
  updateBoard: () => void;
};

export type TGetBoardTask = Omit<TTask, 'boardId' | 'columnId' | 'done'>;

export type TGetAllTasks = Omit<TTask, 'done'>[];
