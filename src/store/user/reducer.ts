import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updatedUserInfo } from '../../models/user';
import { AuthorizationState } from '../../models/store';

const initialAuthorizationState: AuthorizationState = {
  id: '',
  name: '',
  login: '',
  authorizeStatus: false,
  isLoadingUserData: true,
};

const userSlice = createSlice({
  name: 'authorization',
  initialState: initialAuthorizationState,
  reducers: {
    setUserData: (state, { payload }: PayloadAction<AuthorizationState>) => {
      state.authorizeStatus = payload.authorizeStatus;
      state.id = payload.id;
      state.login = payload.login;
      state.name = payload.name;
      state.isLoadingUserData = false;
    },
    setAuthorizeUser: (state) => {
      state.authorizeStatus = true;
    },
    setLoadingUserData: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoadingUserData = payload;
    },
    deleteUserData: (state) => {
      localStorage.removeItem('token');
      state.authorizeStatus = false;
      state.id = '';
      state.login = '';
      state.name = '';
    },
    updateUserData: (state, { payload }: PayloadAction<updatedUserInfo>) => {
      state.login = payload.login;
      state.name = payload.name;
    },
  },
});

export default userSlice;
