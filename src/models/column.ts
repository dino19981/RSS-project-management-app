import { TGetBoardTask } from './task';

export type TColumn = {
  id: string;
  title: string;
  order: number;
  tasks: TGetBoardTask[];
};
