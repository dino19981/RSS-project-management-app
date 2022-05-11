import useAxios from 'axios-hooks';
import { registrationFields } from '../../components/form/constants/fieldsOptions';
import { registrationValues } from '../../components/form/constants/initialValues';
import Preloader from '../../components/preloader/Preloader';
import { AppRoute } from '../../const/routes';
import { fieldsType } from '../../models/form';
import { registrationSchema } from '../../schemas/authentification';
import Authentification from '../authentification/Authentification';

export default function Registration() {
  const [{ loading, error }, refetch] = useAxios('', { manual: true });

  async function onSubmit(value: fieldsType) {
    const requestOptions = {
      url: '/signup',
      method: 'post',
      data: value,
    };
    console.log(requestOptions);
    const data = await refetch(requestOptions);
    console.log(data);
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
    <>
      <Authentification
        formOptions={formOptions}
        buttonText="Зарегистрироваться"
        link={AppRoute.LOGIN}
        linkText="Войти"
        questionText="Уже зарегистрированы?"
        errorMessage={error?.code}
      />
      {loading && <Preloader />}
    </>
  );
}
