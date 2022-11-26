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
};

export type TGetBoardTask = Omit<TTask, 'boardId' | 'columnId'>;

export type TUpdateTask = Omit<TTask, 'files' | 'id'> & {
  taskId: string;
};
