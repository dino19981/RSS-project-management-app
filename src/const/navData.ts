import { AppRoute } from './routes';

export const navData = [
  {
    title: 'Войти',
    path: AppRoute.LOGIN,
    isAuthorize: false,
  },
  {
    title: 'Регистрация',
    path: AppRoute.REGISTRATION,
    isAuthorize: false,
  },
  {
    title: 'Редактировать профиль',
    path: AppRoute.EDIT_PROFILE,
    isAuthorize: true,
  },
  {
    title: 'Выйти',
    path: AppRoute.LOGOUT,
    isAuthorize: true,
  },
];
