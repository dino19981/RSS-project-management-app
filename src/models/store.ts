import { store } from '../store/store';
import { TBoard } from './board';

export interface AuthorizationState {
  id: string;
  name: string;
  login: string;
  authorizeStatus: boolean;
}
export interface BoardsState {
  boards: TBoard[];
  currentBoard: TBoard | null;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
