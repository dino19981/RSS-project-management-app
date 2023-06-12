import { AxiosError } from 'axios';

export function getLoginError(error: AxiosError): string | undefined {
  if (error.response?.status === 403) return 'error_messages.auth.notCorrectLoginOrPass';
}

export function getRegistrationError(error: AxiosError): string | undefined {
  if (error.response?.status === 409) return 'error_messages.auth.alreadyExist';
}
