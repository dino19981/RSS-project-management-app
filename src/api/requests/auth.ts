import { endpoints } from 'api/endpoints';
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
    { dontFetchAtMount: true }
  );
}

export function useMakeLogin() {
  return useAxios<Login>(
    { url: endpoints.login, method: Methods.POST },
    { dontFetchAtMount: true }
  );
}
