export function getAuthentificationErrorMessage(code: number | undefined) {
  if (!code) return;
  switch (code) {
    case 409: {
      return 'Пользователь с данным логином уже зарегистрирован';
    }
    case 403: {
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
