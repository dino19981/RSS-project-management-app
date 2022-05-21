import { string, object } from 'yup';

export const deleteBoardSchema = object()
  .shape({
    title: string().required(),
  })
  .required();
