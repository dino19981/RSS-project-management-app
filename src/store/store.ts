import { configureStore } from '@reduxjs/toolkit';
import boardsSlice from './boards/reducer';
import userSlice from './user/reducer';

export const store = configureStore({
  reducer: {
    authorization: userSlice.reducer,
    boards: boardsSlice.reducer,
  },
});
