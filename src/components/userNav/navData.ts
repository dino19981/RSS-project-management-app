import { AppRoute } from '../../const/routes';

export const navData = [
  {
    title: 'buttons.sign_in',
    path: AppRoute.LOGIN,
    isAuthorize: false,
    type: 'link',
  },
  {
    title: 'buttons.sign_up',
    path: AppRoute.REGISTRATION,
    isAuthorize: false,
    type: 'link',
  },
  {
    title: 'header.edit_profile',
    path: AppRoute.EDIT_PROFILE,
    isAuthorize: true,
    type: 'link',
  },
  {
    title: 'buttons.sign_out',
    path: '',
    isAuthorize: true,
    type: 'button',
  },
];
