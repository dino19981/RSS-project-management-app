import { userActions } from './reducer';

export { userReducer, userActions } from './reducer';

export const { setUserData, deleteUserData, updateUserData, setLoadingUserData, setAuthorizeUser } =
  userActions;
