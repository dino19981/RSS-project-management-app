import { TBoard } from './board';
import { TColumn } from './column';
import { fieldsType } from './form';

export type responses = TBoard[] | TColumn[];

export type requestOptions = {
  url?: string;
  method?: string;
  params?: { [key: string]: string };
  data?: fieldsType;
};

export type hookOptionsType = {
  dontFetchAtMount?: boolean;
};
