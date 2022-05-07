import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import Form from '../../components/form/Form';
import Modal from '../../components/modal/Modal';
import { registrationSchemaType } from '../../models/schemas';
import { registrationSchema } from '../../schemas/registration';

export default function Registration() {
  function onSubmit(value: registrationSchemaType) {
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

  return (
    <Modal isShowFooter={false}>
      <Form {...formOptions}></Form>
      <p className="authentification__text">
        Уже зарегистрированы? <Link to="/signin">Войти</Link>
      </p>
      <div className="authentification__footer">
        <Button
          type="submit"
          text="Зарегистрироваться"
          formId={formOptions.formId}
          btnClass="authentification__button"
        />
      </div>
    </Modal>
  );
}
