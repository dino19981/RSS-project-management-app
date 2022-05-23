import { string, object } from 'yup';

export const newBoardSchema = object()
  .shape({
    title: string().required().trim().min(2),
    description: string().required().trim().min(5),
  })
  .required();
