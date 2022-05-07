import React from 'react';
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
      { name: 'name', labelText: 'Имя' },
      { name: 'login', labelText: 'login' },
      { name: 'password', labelText: 'password', type: 'password' },
    ],
    formId: 'registration',
    onSubmit,
  };

  return (
    <Modal formId="registration" submitBtnName="Зарегистрироваться">
      <Form {...formOptions}></Form>
      <p>
        Уже зарегистрированы? <span>Войти</span>
      </p>
    </Modal>
  );
}
