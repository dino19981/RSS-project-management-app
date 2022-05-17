export const enum AppRoute {
  MAIN = '/',
  LOGIN = '/signin',
  LOGOUT = '/logout',
  EDIT_PROFILE = '/edit-profile',
  REGISTRATION = '/signup',
  NOT_FOUND_PAGE = '/404',
  BOARDS = '/boards',
  BOARD = '/boards/:boardId',
  COLUMNS = '/boards/:boardId/columns',
  COLUMN = '/boards/:boardId/columns/:columnId',
  TASKS = '/boards/:boardId/columns/:columnId/tasks',
  TASK = '/boards/:boardId/columns/:columnId/tasks/:taskId',
}
