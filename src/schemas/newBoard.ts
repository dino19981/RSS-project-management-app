import { string, object } from 'yup';

export const newBoardSchema = object()
  .shape({
    title: string().required().trim().min(1).max(20),
    description: string().required().trim().min(1).max(60),
  })
  .required();
