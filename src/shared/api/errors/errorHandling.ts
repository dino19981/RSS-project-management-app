import { endpoints } from 'shared/api/endpoints';
import { AxiosError } from 'axios';
import { getBoardsError } from './entities/boards';
import { getLoginError, getRegistrationError } from './entities/auth';
import { getUserError } from './entities/user';

export const commonErrorMessages = {
  unknownError: 'error_messages.server_error',
};

type EndpointsKeys = typeof endpoints[keyof typeof endpoints];

export function getErrorMessage(error: AxiosError) {
  if (!error.response) return commonErrorMessages.unknownError;

  const messageByUrl: Record<EndpointsKeys, string | undefined> = {
    [endpoints.boards]: getBoardsError(error),
    [endpoints.registration]: getRegistrationError(error),
    [endpoints.users]: getUserError(error),
    [endpoints.login]: getLoginError(error),
  };

  return messageByUrl[error.config.url as EndpointsKeys] ?? commonErrorMessages.unknownError;
}
