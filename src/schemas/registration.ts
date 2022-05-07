import * as yup from 'yup';

export const registrationSchema = yup
  .object()
  .shape({
    name: yup.string().required().max(15),
    login: yup.string().required().matches(/^\S+$/),
    password: yup.string().required().min(5),
  })
  .required();
