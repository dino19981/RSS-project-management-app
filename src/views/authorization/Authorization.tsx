import React from 'react';
import { autorizationFields } from '../../components/form/constants/fieldsOptions';
import { autorizationValues } from '../../components/form/constants/initialValues';
import Loader from '../../components/loader/loader';
import { AppRoute } from '../../const/routes';
import { useAxios } from '../../hooks/useAxios';
import { instanceAxios } from '../../HTTP/configuration';
import { fieldsType } from '../../models/form';
import { autorizationSchema } from '../../schemas/authentification';
import Authentification from '../authentification/Authentification';

export default function Autorization() {
  const { isLoading, isError, refetch } = useAxios({}, { dontFetchAtMount: true });

  async function onSubmit(value: fieldsType) {
    console.log(value);
    const resp = await refetch({ url: '/signin', method: 'post', data: value });
    console.log(resp, 'resp');
  }

  const formOptions = {
    schema: autorizationSchema,
    initialValues: autorizationValues,
    fields: autorizationFields,
    formId: 'autorization',
    onSubmit,
    formClassName: 'authentification__form',
  };

  if (isError) {
    console.log('error');
  }

  return (
    <>
      <Authentification
        formOptions={formOptions}
        buttonText="Войти"
        link={AppRoute.REGISTRATION}
        linkText="Создать аккаунт"
        answerText="Еще не зарегистрированы?"
      />
      {isLoading && <Loader />}
    </>
  );
}
