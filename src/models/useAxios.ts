import { TBoard } from './board';
import { TColumn } from './column';
import { User } from './user';
import { fieldsType } from './form';
import { TTask } from './task';

export type responses = TBoard[] | TColumn[] | TBoard | TColumn | TTask | User;

export type requestOptions = {
  url?: string;
  method?: string;
  params?: { [key: string]: string };
  data?: fieldsType;
};

export type hookOptionsType = {
  dontFetchAtMount?: boolean;
};
