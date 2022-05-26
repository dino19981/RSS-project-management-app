import { AppRoute } from './routes';

export const navData = [
  {
    title: 'buttons.sign_in',
    path: AppRoute.LOGIN,
    isAuthorize: false,
  },
  {
    title: 'buttons.sign_up',
    path: AppRoute.REGISTRATION,
    isAuthorize: false,
  },
  {
    title: 'header.edit_profile',
    path: AppRoute.EDIT_PROFILE,
    isAuthorize: true,
  },
  {
    title: 'buttons.sign_out',
    path: '',
    isAuthorize: true,
  },
];
