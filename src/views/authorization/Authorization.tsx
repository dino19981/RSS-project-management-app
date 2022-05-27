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
import { useTranslation } from 'react-i18next';

export default function Autorization() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, isError, request } = useAxios({}, { dontFetchAtMount: true });

  async function signIn(value: fieldsType) {
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

      navigate(AppRoute.MAIN);
    }
  }

  const formOptions = {
    schema: autorizationSchema,
    initialValues: autorizationValues,
    fields: autorizationFields,
    formId: 'autorization',
    onSubmit: signIn,
    formClassName: 'authentification__form',
  };

  return (
    <div className="authentification">
      <Authentification
        formOptions={formOptions}
        buttonText={t('buttons.sign_in')}
        link={AppRoute.REGISTRATION}
        linkText={t('sign_in.create_account')}
        questionText={t('sign_in.no_register_text')}
        errorMessage={isError && getAuthentificationErrorMessage(isError.response?.status)}
        loadingStatus={isLoading}
      />
      {isLoading && <Loader />}
    </div>
  );
}
