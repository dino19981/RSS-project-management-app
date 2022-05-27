import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationState } from '../../models/store';

const initialAuthorizationState: AuthorizationState = {
  id: '',
  name: '',
  login: '',
  authorizeStatus: false,
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
    },
    deleteUserData: (state) => {
      localStorage.removeItem('token');
      state.authorizeStatus = false;
      state.id = '';
      state.login = '';
      state.name = '';
    },
  },
});

export default userSlice;
