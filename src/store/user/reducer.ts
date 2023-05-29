import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationState } from '../../models/store';
import { User } from 'api/requests/user';

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
    setUserData: (_, { payload }: PayloadAction<Omit<AuthorizationState, 'isLoadingUserData'>>) => {
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
    updateUserData: (state, { payload }: PayloadAction<Omit<User, 'id'>>) => {
      state.login = payload.login;
      state.name = payload.name;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
