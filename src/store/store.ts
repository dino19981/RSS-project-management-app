import { combineReducers, configureStore } from '@reduxjs/toolkit';
import boardSlice from './board/reducer';
import userSlice from './user/reducer';

export const rootReducer = combineReducers({
  authorization: userSlice.reducer,
  board: boardSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
