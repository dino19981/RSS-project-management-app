import { store } from '../store';
import { TBoard } from './board';

export interface AuthorizationState {
  id: string;
  name: string;
  login: string;
  authorizeStatus: boolean;
  isLoadingUserData: boolean;
}

export interface BoardState {
  board: TBoard;
  fetchError: string;
  fetchLoading: boolean;
  requestError: string;
  requestLoading: boolean;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
