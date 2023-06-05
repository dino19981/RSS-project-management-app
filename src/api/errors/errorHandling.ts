import { endpoints } from 'api/endpoints';
import { AxiosError } from 'axios';
import { getBoardsError } from './entities/boards';
import { getLoginError, getRegistrationError } from './entities/auth';
import { getUserError } from './entities/user';

const commonErrorMessages = {
  unknownError: 'error_messages.server_error',
};

type EndpointsKeys = typeof endpoints[keyof typeof endpoints];

export function getErrorMessage(error: AxiosError) {
  if (!error.response) return commonErrorMessages.unknownError;
  getErrorOptions(error);

  const messageByUrl: Record<EndpointsKeys, string | undefined> = {
    [endpoints.boards]: getBoardsError(error),
    [endpoints.registration]: getRegistrationError(error),
    [endpoints.users]: getUserError(error),
    [endpoints.login]: getLoginError(error),
  };

  return messageByUrl[error.config.url as EndpointsKeys] ?? commonErrorMessages.unknownError;
}

function getErrorOptions(error: AxiosError) {
  const { method, url } = error.config;
  const requestUrl = url?.split('/').reverse();

  const endpointValues = Object.values(endpoints);

  requestUrl?.forEach((item) => {
    if (endpointValues.includes(item)) {
    }
  });
  console.log(requestUrl);

  return {
    method,
  };
}

async function showData() {
  const response = await fetch(url);
  const data = await response.json();
  document.body.innerHTML = JSON.stringify(data);
}

showData();
