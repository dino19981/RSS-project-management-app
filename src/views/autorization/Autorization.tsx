import useAxios from 'axios-hooks';
import { useNavigate } from 'react-router-dom';
import { autorizationFields } from '../../components/form/constants/fieldsOptions';
import { autorizationValues } from '../../components/form/constants/initialValues';
import Preloader from '../../components/preloader/Preloader';
import { AppRoute } from '../../const/routes';
import { fieldsType } from '../../models/form';
import { autorizationSchema } from '../../schemas/authentification';
import Authentification from '../authentification/Authentification';

export default function Autorization() {
  const navigate = useNavigate();
  const [{ loading, error }, refetch] = useAxios('', { manual: true });

  async function onSubmit(value: fieldsType) {
    const requestOptions = {
      url: '/signin',
      method: 'post',
      data: value,
    };

    await refetch(requestOptions);
    navigate(AppRoute.MAIN);
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
    <>
      <Authentification
        formOptions={formOptions}
        buttonText="Войти"
        link={AppRoute.REGISTRATION}
        linkText="Создать аккаунт"
        questionText="Еще не зарегистрированы?"
        errorMessage={error?.code}
      />
      {loading && <Preloader />}
    </>
  );
}
