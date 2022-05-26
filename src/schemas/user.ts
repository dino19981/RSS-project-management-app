import { string, object } from 'yup';

export const editProfileSchema = object()
  .shape({
    login: string().required().matches(/^\S+$/).min(3),
    password: string().required().min(5),
    name: string().required().max(15),
  })
  .required();

export const deleteUserSchema = object()
  .shape({
    login: string().required().matches(/^\S+$/).min(3),
  })
  .required();
