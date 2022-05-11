import { registrationFields } from '../../components/form/constants/fieldsOptions';
import { registrationValues } from '../../components/form/constants/initialValues';
import { AppRoute } from '../../const/routes';
import { useAxios } from '../../hooks/useAxios';
import { instanceAxios } from '../../HTTP/configuration';
import { fieldsType } from '../../models/form';
import { registrationSchema } from '../../schemas/authentification';
import Authentification from '../authentification/Authentification';

export default function Registration() {
  const { isLoading, isError, refetch } = useAxios({}, { dontFetchAtMount: true });

  async function onSubmit(value: fieldsType) {
    console.log(value);
    const resp = refetch({ url: '/signup', method: 'post', data: value });
    console.log(resp, 'resp');
  }

  const formOptions = {
    schema: registrationSchema,
    initialValues: registrationValues,
    fields: registrationFields,
    formId: 'registration',
    onSubmit,
    formClassName: 'authentification__form',
  };

  return (
    <Authentification
      formOptions={formOptions}
      buttonText="Зарегистрироваться"
      link={AppRoute.LOGIN}
      linkText="Войти"
      answerText="Уже зарегистрированы?"
    />
  );
}
