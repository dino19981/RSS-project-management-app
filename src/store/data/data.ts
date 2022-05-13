import { createReducer } from '@reduxjs/toolkit';
import { DataState } from '../../models/store';
import { changeAuthorizeStatus } from '../action';

export const initialState: DataState = {
  authorizeStatus: false,
};

export const data = createReducer(initialState, (builder) => {
  builder.addCase(changeAuthorizeStatus, (state, action) => {
    state.authorizeStatus = action.payload;
  });
});
