import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { registrationFields } from '../../../../components/form/constants/fieldsOptions';
import { registrationValues } from '../../../../components/form/constants/initialValues';
import Loader from '../../../../components/loader/loader';
import { Methods } from '../../../../const/APIMethod';
import { AppRoute } from '../../../../const/routes';
import { useAxios } from '../../../../hooks/useAxios';
import { fieldsType } from '../../../../models/form';
import { registrationSchema } from '../../../../schemas/authentication';
import { getAuthenticationErrorMessage } from '../../../../utils/authentication';
import Authentication from '../Authentication';

export default function Registration() {
  const { t } = useTranslation();
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
    formClassName: 'authentication__form',
  };

  return (
    <div className="authentication">
      <Authentication
        formOptions={formOptions}
        buttonText={t('buttons.sign_up')}
        link={AppRoute.LOGIN}
        linkText={t('buttons.sign_in')}
        questionText={t('sign_up.is_have_login_text')}
        errorMessage={isError && getAuthenticationErrorMessage(isError.response?.status)}
        loadingStatus={isLoading}
      />
      {isLoading && <Loader />}
    </div>
  );
}
