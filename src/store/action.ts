import { createAction } from '@reduxjs/toolkit';

export enum ActionType {
  CHANGE_AUTHORIZE_STATUS = 'CHANGE_AUTHORIZE_STATUS',
}

export const changeAuthorizeStatus = createAction(
  ActionType.CHANGE_AUTHORIZE_STATUS,
  (status: boolean) => ({ payload: status })
);
