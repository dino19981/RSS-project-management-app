import { string, object } from 'yup';

export const columSchema = object()
  .shape({
    title: string().trim().required().min(1),
  })
  .required();
