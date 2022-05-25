import { TGetBoardTask, TTask } from './task';

export type TColumn = {
  id: string;
  title: string;
  order: number;
  tasks: TGetBoardTask[];
};

export type TColumnProps = TColumn & {
  updateHandler: () => Promise<void>;
};

export type TGetColumn = {
  id: string;
  title: string;
  order: number;
  tasks: Omit<TTask, 'boardId'>[];
};
