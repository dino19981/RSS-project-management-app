import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationState } from '../../models/store';

const initialAuthorizationState: AuthorizationState = {
  authorizeStatus: false,
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: initialAuthorizationState,
  reducers: {
    changeAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.authorizeStatus = action.payload;
    },
  },
});

export default authorizationSlice;
