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

export const teamMembers = [
  {
    id: 1,
    name: 'Артем',
    ghLink: 'https://github.com/dino19981',
    role: 'Team-lead',
  },
  {
    id: 2,
    name: 'Роман',
    ghLink: 'https://github.com/Romnasi',
    role: 'Front-end',
  },
  {
    id: 3,
    name: 'Дмитрий',
    ghLink: 'https://github.com/excluz1v',
    role: 'Front-end',
  },
];
