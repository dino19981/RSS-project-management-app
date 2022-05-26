import { TColumn } from './column';

export type TBoard = {
  id: string;
  title: string;
  columns: TColumn[];
  description: string;
};
