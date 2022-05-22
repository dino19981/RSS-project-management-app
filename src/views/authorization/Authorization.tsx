import { useNavigate } from 'react-router-dom';
import { autorizationFields } from '../../components/form/constants/fieldsOptions';
import { autorizationValues } from '../../components/form/constants/initialValues';
import Loader from '../../components/loader/loader';
import { AppRoute } from '../../const/routes';
import { useAxios } from '../../hooks/useAxios';
import { fieldsType } from '../../models/form';
import { autorizationSchema } from '../../schemas/authentification';
import { useAppDispatch } from '../../store/hooks';
import { getAuthentificationErrorMessage, getUserData } from '../../utils/authentification';
import Authentification from '../authentification/Authentification';
import { setUserData } from '../../store/user/actions';
import { Methods } from '../../const/APIMethoods';

export default function Autorization() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, isError, request } = useAxios({}, { dontFetchAtMount: true });

  async function onSubmit(value: fieldsType) {
    const loginRequestOptions = {
      url: AppRoute.LOGIN,
      method: Methods.POST,
      data: value,
    };

    const loginData = await request(loginRequestOptions);

    if (loginData) {
      localStorage.setItem('token', loginData?.data.token);

      const userData = await getUserData(loginData?.data.token);
      dispatch(setUserData(userData));

      navigate(AppRoute.BOARDS);
    }
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
        errorMessage={isError && getAuthentificationErrorMessage(isError.response?.status)}
        loadingStatus={isLoading}
      />
      {isLoading && <Loader />}
    </>
  );
}
