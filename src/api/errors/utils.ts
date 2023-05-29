import { endpoints } from 'api/endpoints';
import { AxiosError } from 'axios';

const commonErrorMessages = {
  unknownError: 'Произошла ошибка, попробуйте позже.',
};

export function getErrorMessage(error: AxiosError) {
  if (!error.response) return commonErrorMessages.unknownError;

  const messageByUrl: Record<keyof endpoints, string> = {
    [endpoints.boards]: getBoardsError(error),
    [endpoints.registration]: getBoardsError(error),
    [endpoints.users]: getBoardsError(error),
    [endpoints.login]: getBoardsError(error),
  };

  return messageByUrl[error.config.url] ?? commonErrorMessages.unknownError;
}

function getBoardsError(error: AxiosError): string {
  const errorCode = error.response.status;

  const messageByMethod = {
    get get() {
      if (error.config.params?.id) return errorMessages.cantGetUser;
      return errorMessages.cantGetUsers;
    },
    get post() {
      if (errorCode === 422) return errorMessages.userAlreadyExist;
      return errorMessages.cantAddUser;
    },
    get patch() {
      if (errorCode === 422) return errorMessages.cannotBlockAdmin;
      return errorMessages.cantUpdateUser;
    },
    delete: errorMessages.cantDeleteUser,
  };

  return messageByMethod[error.config.method] ?? commonErrorMessages.unknownError;
}
