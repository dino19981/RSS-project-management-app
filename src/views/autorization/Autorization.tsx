import React from 'react';
import { autorizationFields } from '../../components/form/constants/fieldsOptions';
import { autorizationValues } from '../../components/form/constants/initialValues';
import { AppRoute } from '../../const/routes';
import { fieldsType } from '../../models/form';
import { autorizationSchema } from '../../schemas/authentification';
import Authentification from '../authentification/Authentification';

export default function Autorization() {
  async function onSubmit(value: fieldsType) {
    console.log(value);
  }

  const formOptions = {
    schema: autorizationSchema,
    initialValues: autorizationValues,
    fields: autorizationFields,
    formId: 'autorization',
    onSubmit,
    formClassName: 'authentification__form',
  };

  return (
    <Authentification
      formOptions={formOptions}
      buttonText="Войти"
      link={AppRoute.REGISTRATION}
      linkText="Создать аккаунт"
      answerText="Еще не зарегистрированы?"
    />
  );
}
