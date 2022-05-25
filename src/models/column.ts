import { TTask } from './task';

export type TColumn = {
  id: string;
  title: string;
  order: number;
  tasks: TTask[];
};

export type TColumnProps = TColumn & {
  updateHandler: () => Promise<void>;
};
