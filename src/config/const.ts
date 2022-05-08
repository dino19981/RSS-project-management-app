export const enum AppRoutes {
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
    path: AppRoutes.LOGIN,
    isAuthorize: false,
  },
  {
    title: 'Регистрация',
    path: AppRoutes.REGISTRATION,
    isAuthorize: false,
  },
  {
    title: 'Редактировать профиль',
    path: AppRoutes.EDIT_PROFILE,
    isAuthorize: true,
  },
  {
    title: 'Выйти',
    path: AppRoutes.LOGOUT,
    isAuthorize: true,
  },
];
