import { AxiosError } from 'axios';

export function getLoginError(error: AxiosError): string | undefined {
  if (error.status === '403') return 'auth.notCorrectLoginOrPass';
}

export function getRegistrationError(error: AxiosError): string | undefined {
  if (error.status === '409') return 'auth.alreadyExist';
}
