import { RootState } from '../../models/store';

export const selectAuthStatus = (state: RootState) => state.authorization.authorizeStatus;
