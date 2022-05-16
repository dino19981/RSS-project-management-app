export const autorizationFields = [
  {
    name: 'login',
    labelText: 'Логин',
    errorMessage: 'Пробелы недопустимы, минимальная длина 3 символа',
  },
  {
    name: 'password',
    labelText: 'Пароль',
    type: 'password',
    errorMessage: 'Минимальная длина 5 символов',
  },
];

export const registrationFields = [
  { name: 'name', labelText: 'Имя', errorMessage: 'Максимальная длина 15 символов' },
  { name: 'login', labelText: 'Логин', errorMessage: 'Пробелы недопустимы' },
  {
    name: 'password',
    labelText: 'Пароль',
    type: 'password',
    errorMessage: 'Минимальная длина 5 символов',
  },
];

export const deleteBoardfields = [
  {
    name: 'title',
    labelText: 'Действительно удалить доску?',
    isdisabled: true,
  },
];
