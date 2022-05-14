import { configureStore } from '@reduxjs/toolkit';
import authorizationSlice from './auth/reducer';

export const store = configureStore({
  reducer: {
    authorization: authorizationSlice.reducer,
  },
});
