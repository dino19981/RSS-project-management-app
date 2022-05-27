import { useNavigate } from 'react-router-dom';
import { registrationFields } from '../../components/form/constants/fieldsOptions';
import { registrationValues } from '../../components/form/constants/initialValues';
import Loader from '../../components/loader/loader';
import { Methods } from '../../const/APIMethoods';
import { AppRoute } from '../../const/routes';
import { useAxios } from '../../hooks/useAxios';
import { fieldsType } from '../../models/form';
import { registrationSchema } from '../../schemas/authentification';
import { getAuthentificationErrorMessage } from '../../utils/authentification';
import Authentification from '../authentification/Authentification';

export default function Registration() {
  const navigate = useNavigate();
  const { isLoading, isError, request } = useAxios({}, { dontFetchAtMount: true });

  async function onSubmit(value: fieldsType) {
    const requestOptions = {
      url: AppRoute.REGISTRATION,
      method: Methods.POST,
      data: value,
    };
    const data = await request(requestOptions);
    if (data) {
      navigate(AppRoute.LOGIN);
    }
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
    <div className="authentification">
      <Authentification
        formOptions={formOptions}
        buttonText="Зарегистрироваться"
        link={AppRoute.LOGIN}
        linkText="Войти"
        questionText="Уже зарегистрированы?"
        errorMessage={isError && getAuthentificationErrorMessage(isError.response?.status)}
        loadingStatus={isLoading}
      />
      {isLoading && <Loader />}
    </div>
  );
}
