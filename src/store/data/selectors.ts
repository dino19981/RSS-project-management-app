import { CombineState } from '../../models/store';

export const getAuthorizeStatus = (state: CombineState) => state.DATA.authorizeStatus;
