import { store } from '../store/store';
import { TBoard } from './board';
import { TColumn } from './column';

export interface AuthorizationState {
  id: string;
  name: string;
  login: string;
  authorizeStatus: boolean;
}
export interface BoardsState {
  boards: TBoard[];
  currentBoard: TBoard | null;
  columns: TColumn[];
  currentColumn: TColumn | null;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
