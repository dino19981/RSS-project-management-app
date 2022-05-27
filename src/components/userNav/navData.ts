import { AppRoute } from '../../const/routes';

export const navData = [
  {
    title: 'Войти',
    path: AppRoute.LOGIN,
    isAuthorize: false,
    type: 'link',
  },
  {
    title: 'Регистрация',
    path: AppRoute.REGISTRATION,
    isAuthorize: false,
    type: 'link',
  },
  {
    title: 'Редактировать профиль',
    path: AppRoute.EDIT_PROFILE,
    isAuthorize: true,
    type: 'link',
  },
  {
    title: 'Выйти',
    path: AppRoute.LOGOUT,
    isAuthorize: true,
    type: 'button',
  },
];
