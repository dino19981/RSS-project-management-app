import { request } from 'shared/api/configuration/request';
import { endpoints } from 'shared/api/endpoints';
import { getUserError } from 'shared/api/errors/entities/user';
import { Methods } from 'const/APIMethod';
import { useAxios } from 'hooks/useAxios';
import { parseJwt } from 'utils/authentication';

export type User = {
  id: string;
  name: string;
  login: string;
};

export const getUserData = async (token: string) => {
  const userId = parseJwt(token).userId;

  const url = `${endpoints.users}/${userId}`;
  const userResponse = await request<User>({ url }, getUserError);

  return userResponse.data;
};

export const useEditUser = (userId: string) => {
  const url = `${endpoints.users}/${userId}`;

  return useAxios<User>({ url, method: Methods.PUT }, { dontFetchAtMount: true }, getUserError);
};

export const useDeleteUser = (userId: string) => {
  const url = `${endpoints.users}/${userId}`;

  return useAxios<User>({ url, method: Methods.DELETE }, { dontFetchAtMount: true }, getUserError);
};
