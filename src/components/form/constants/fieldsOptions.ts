import { ErrorMessage } from '../../../const/errorMesages';

export const autorizationFields = [
  {
    name: 'login',
    labelText: 'labels.login',
    errorMessage: ErrorMessage.NO_WHITESPACES_AND_MIN_LENGTH_3,
  },
  {
    name: 'password',
    labelText: 'labels.password',
    type: 'password',
    errorMessage: ErrorMessage.MIN_LENGTH_5,
  },
];

export const registrationFields = [
  { name: 'name', labelText: 'labels.name', errorMessage: 'Максимальная длина 15 символов' },
  {
    name: 'login',
    labelText: 'labels.login',
    errorMessage: ErrorMessage.NO_WHITESPACES_AND_MIN_LENGTH_3,
  },
  {
    name: 'password',
    labelText: 'labels.password',
    type: 'password',
    errorMessage: ErrorMessage.MIN_LENGTH_5,
  },
];

export const editProfileFields = registrationFields;

export const deleteBoardFields = [
  {
    name: 'title',
    labelText: 'Действительно удалить доску?',
    isdisabled: true,
  },
];

export const deleteTaskfields = [
  {
    name: 'title',
    labelText: 'Действительно удалить задачу?',
    isdisabled: true,
  },
];

export const columnfields = [
  { name: 'title', errorMessage: 'Title is required', placeholder: 'Column Title' },
];

export const newBoardFields = [
  {
    name: 'title',
    labelText: 'Название доски',
    errorMessage: 'Название обязательно',
    placeholder: 'Введите название доски',
  },
  {
    name: 'description',
    labelText: 'Описание',
    errorMessage: 'Описание обязательно',
    placeholder: 'Введите краткое описание',
  },
];

export const createTaskFields = [
  { name: 'title', errorMessage: 'Title is required', placeholder: 'Task Title' },
  { name: 'description', errorMessage: 'description is required', placeholder: 'description' },
];
