import { useNavigate } from 'react-router-dom';
import { authorizationFields } from '../../../../components/form/constants/fieldsOptions';
import { autorizationValues } from '../../../../components/form/constants/initialValues';
import Loader from '../../../../components/loader/loader';
import { AppRoute } from '../../../../const/routes';
import { fieldsType } from '../../../../models/form';
import { autorizationSchema } from '../../../../schemas/authentication';
import { useAppDispatch } from '../../../../store';
import { getAuthenticationErrorMessage } from '../../../../utils/authentication';
import Authentication from '../Authentication';
import { useTranslation } from 'react-i18next';
import { setUserData } from '../../../../store/user';
import { useMakeLogin } from 'api/requests/auth';
import { getUserData } from 'api/requests/user';

export default function Autorization() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, isError, request } = useMakeLogin();

  async function signIn(value: fieldsType) {
    const loginData = await request({ data: value });

    if (loginData) {
      localStorage.setItem('token', loginData.data.token);

      const userData = await getUserData(loginData.data.token);
      dispatch(setUserData({ ...userData, authorizeStatus: true }));

      navigate(AppRoute.MAIN);
    }
  }

  const formOptions = {
    schema: autorizationSchema,
    initialValues: autorizationValues,
    fields: authorizationFields,
    formId: 'autorization',
    onSubmit: signIn,
    formClassName: 'authentication__form',
  };

  return (
    <div className="authentication">
      <Authentication
        formOptions={formOptions}
        buttonText={t('buttons.sign_in')}
        link={AppRoute.REGISTRATION}
        linkText={t('sign_in.create_account')}
        questionText={t('sign_in.no_register_text')}
        errorMessage={isError && getAuthenticationErrorMessage(isError.response?.status)}
        loadingStatus={isLoading}
      />
      {isLoading && <Loader />}
    </div>
  );
}
