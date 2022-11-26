import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/user';
import { AuthorizationState } from '../../models/store';

const initialState: AuthorizationState = {
  id: '',
  name: '',
  login: '',
  authorizeStatus: false,
  isLoadingUserData: true,
};

const userSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setUserData: (state, { payload }: PayloadAction<AuthorizationState>) => {
      return { ...payload, isLoadingUserData: false };
    },
    setAuthorizeUser: (state) => {
      state.authorizeStatus = true;
    },
    setLoadingUserData: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoadingUserData = payload;
    },
    deleteUserData: (state) => {
      localStorage.removeItem('token');

      return { ...initialState, isLoadingUserData: state.isLoadingUserData };
    },
    updateUserData: (state, { payload }: PayloadAction<User>) => {
      state.login = payload.login;
      state.name = payload.name;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
