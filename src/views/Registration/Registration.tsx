import { instanceAxios } from '../../HTTP/configuration';
import { fieldsType } from '../../models/form';
import { registrationSchema } from '../../schemas/authentification';
import Authentification from '../authentification/Authentification';

export default function Registration() {
  async function onSubmit(value: fieldsType) {
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
