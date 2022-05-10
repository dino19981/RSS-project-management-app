import { string, object } from 'yup';

export const autorizationSchema = object()
  .shape({
    login: string().required().matches(/^\S+$/).min(3),
    password: string().required().min(5),
  })
  .required();

export const registrationSchema = autorizationSchema.concat(
  object()
    .shape({
      name: string().required().max(15),
    })
    .required()
);
