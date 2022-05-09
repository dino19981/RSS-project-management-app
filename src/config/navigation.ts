export const enum AppRoute {
  MAIN = '/',
  LOGIN = '/login',
  LOGOUT = '/logout',
  EDIT_PROFILE = '/edit-profile',
  REGISTRATION = '/registration',
  NOT_FOUND_PAGE = '/404',
}

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
