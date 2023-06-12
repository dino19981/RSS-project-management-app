import { endpoints } from 'shared/api/endpoints';
import { getLoginError, getRegistrationError } from 'shared/api/errors/entities/auth';
import { Methods } from 'const/APIMethod';
import { useAxios } from 'hooks/useAxios';

type Registration = {
  id: string;
  name: string;
  login: string;
};

type Login = {
  token: string;
};

export function useMakeRegistration() {
  return useAxios<Registration>(
    { url: endpoints.registration, method: Methods.POST },
    { dontFetchAtMount: true },
    getRegistrationError
  );
}

export function useMakeLogin() {
  return useAxios<Login>(
    { url: endpoints.login, method: Methods.POST },
    { dontFetchAtMount: true },
    getLoginError
  );
}
