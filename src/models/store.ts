import { store } from '../store/store';

export interface AuthorizationState {
  id: string;
  name: string;
  login: string;
  authorizeStatus: boolean;
}
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
