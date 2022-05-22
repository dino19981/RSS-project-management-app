import { TFile } from './file';

export type TTask = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: TFile[];
  done: boolean;
};

export type TGetBoardTask = Omit<TTask, 'boardId' | 'columnId' | 'done'>;

export type TGetAllTasks = Omit<TTask, 'done'>[];
