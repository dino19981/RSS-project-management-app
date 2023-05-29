import { responseStatus } from '../const/responseStatus';
import { instanceAxios } from '../api/configuration/axios';

export function getAuthenticationErrorMessage(code: number | undefined) {
  if (!code) return;
  switch (code) {
    case responseStatus.USER_NAME_ALREADY_REGISTERED: {
      return 'Пользователь с данным логином уже зарегистрирован';
    }
    case responseStatus.INVALID_PASS_OR_LOGIN: {
      return 'Неверный логин или пароль';
    }
    default: {
      return 'Ошибка сервера';
    }
  }
}

export const parseJwt = (token: string) => {
  //https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
