import { TFile } from './file';

export type TTask = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  files: TFile[];
  boardId: string;
  columnId: string;
};

export type searchListTasks = TTask & { columnId: string; boardId: string };

export type taskProps = TGetBoardTask & {
  columnId: string;
  updateBoard: () => void;
};

export type TGetBoardTask = Omit<TTask, 'boardId' | 'columnId' | 'done'>;

export type TGetAllTasks = Omit<TTask, 'done'>[];
