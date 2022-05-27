import { ErrorMessage } from '../../../const/errorMesages';

export const autorizationFields = [
  {
    name: 'login',
    labelText: 'labels.login',
    errorMessage: ErrorMessage.NO_WHITE_SPACES_AND_MIN_LENGTH_3,
  },
  {
    name: 'password',
    labelText: 'labels.password',
    type: 'password',
    errorMessage: ErrorMessage.MIN_LENGTH_5,
  },
];

export const registrationFields = [
  { name: 'name', labelText: 'labels.name', errorMessage: ErrorMessage.MAX_LENGTH_15 },
  {
    name: 'login',
    labelText: 'labels.login',
    errorMessage: ErrorMessage.NO_WHITE_SPACES_AND_MIN_LENGTH_3,
  },
  {
    name: 'password',
    labelText: 'labels.password',
    type: 'password',
    errorMessage: ErrorMessage.MIN_LENGTH_5,
  },
];

export const editProfileFields = registrationFields;

export const columnfields = [
  {
    name: 'title',
    errorMessage: 'error_messages.title_required',
    placeholder: 'placeholders.column_title',
  },
];

export const newBoardFields = [
  {
    name: 'title',
    errorMessage: 'error_messages.title_required',
    placeholder: 'placeholders.board_name',
  },
  {
    name: 'description',
    errorMessage: 'error_messages.description_required',
    placeholder: 'placeholders.board_description',
  },
];

export const createTaskFields = [
  {
    name: 'title',
    errorMessage: 'error_messages.title_required',
    placeholder: 'placeholders.task_title',
  },
  {
    name: 'description',
    errorMessage: 'error_messages.description_required',
    placeholder: 'placeholders.task_description',
  },
];
