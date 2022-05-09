import React from 'react';
import { fieldsType } from '../../models/form';
import { autorizationSchema } from '../../schemas/authentification';
import Authentification from '../authentification/Authentification';

export default function Autorization() {
  async function onSubmit(value: fieldsType) {
    console.log(value);
  }

  const formOptions = {
    schema: autorizationSchema,
    initialValues: {
      login: '',
      password: '',
    },
    fields: [
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
    ],
    formId: 'autorization',
    onSubmit,
    formClassName: 'authentification__form',
  };

  return <Authentification formOptions={formOptions} buttonText="Войти" />;
}
