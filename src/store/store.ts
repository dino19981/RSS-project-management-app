import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { boardReducer } from './board';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  authorization: userReducer,
  board: boardReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
