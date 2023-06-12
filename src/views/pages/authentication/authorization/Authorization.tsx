import { useNavigate } from 'react-router-dom';
import { authorizationFields } from '../../../../components/form/constants/fieldsOptions';
import { authorizationValues } from '../../../../components/form/constants/initialValues';
import Loader from '../../../../components/loader/loader';
import { AppRoute } from '../../../../const/routes';
import { fieldsType } from '../../../../models/form';
import { authorizationSchema } from '../../../../schemas/authentication';
import { useAppDispatch } from '../../../../store';
import Authentication from '../Authentication';
import { useTranslation } from 'react-i18next';
import { setUserData } from '../../../../store/user';
import { useMakeLogin } from 'shared/api/requests/auth';
import { getUserData } from 'shared/api/requests/user';

export function Authorization() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error, request } = useMakeLogin();

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
    schema: authorizationSchema,
    initialValues: authorizationValues,
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
        errorMessage={error?.message}
        loadingStatus={isLoading}
      />
      {isLoading && <Loader />}
    </div>
  );
}
