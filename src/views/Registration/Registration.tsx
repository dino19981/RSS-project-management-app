import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import Form from '../../components/form/Form';
import Modal from '../../components/modal/Modal';
import { fieldsType } from '../../models/form';
import { registrationSchema } from '../../schemas/registration';
import Authentification from '../authentification/Authentification';

export default function Registration() {
  function onSubmit(value: fieldsType) {
    console.log(value);
  }

  const formOptions = {
    schema: registrationSchema,
    initialValues: {
      name: '',
      login: '',
      password: '',
    },
    fields: [
      { name: 'name', labelText: 'Имя', errorMessage: 'Максимальная длина 15 символов' },
      { name: 'login', labelText: 'Логин', errorMessage: 'Пробелы недопустимы' },
      {
        name: 'password',
        labelText: 'Пароль',
        type: 'password',
        errorMessage: 'Минимальная длина 5 символов',
      },
    ],
    formId: 'registration',
    onSubmit,
    formClassName: 'authentification__form',
  };

  return <Authentification formOptions={formOptions} buttonText="Зарегистрироваться" />;
}
