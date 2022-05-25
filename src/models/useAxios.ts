import { TBoard } from './board';
import { TColumn } from './column';
import { userDataType } from './editUserProfile';
import { fieldsType } from './form';

export type responses = TBoard[] | TColumn[] | TBoard | TColumn | userDataType;

export type requestOptions = {
  url?: string;
  method?: string;
  params?: { [key: string]: string };
  data?: fieldsType;
};

export type hookOptionsType = {
  dontFetchAtMount?: boolean;
};
