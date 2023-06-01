import { AxiosError, Method } from 'axios';

export const errors = {
  cantGetUsers: 'Не удалось получить пользователей',
  cantGetUser: 'Не удалось получить пользователя',
  cantUpdateUser: 'Не удалось обновить пользователя.',
  cantDeleteUser: 'Не удалось удалить пользователя.',
  cantCreateUser: 'Не удалось обновить пользователя.',
};

export function getUserError(error: AxiosError): string | undefined {
  const messageByMethod: Partial<Record<Method, string>> = {
    get get() {
      if (error.config.params?.id) return errors.cantGetUser;
      return errors.cantGetUsers;
    },
    get post() {
      return errors.cantCreateUser;
    },
    get patch() {
      return errors.cantUpdateUser;
    },
    delete: errors.cantDeleteUser,
  };

  return messageByMethod[error.config.method as Method];
}
