import { AxiosError } from 'axios';

export function getLoginError(error: AxiosError): string | undefined {
  if (error.status === '403') return 'Неверный логин или пароль';
}

export function getRegistrationError(error: AxiosError): string | undefined {
  if (error.status === '409') return 'Пользователь с данным логином уже зарегистрирован';
}
