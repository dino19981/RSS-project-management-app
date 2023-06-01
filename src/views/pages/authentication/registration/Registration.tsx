import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { registrationFields } from '../../../../components/form/constants/fieldsOptions';
import { registrationValues } from '../../../../components/form/constants/initialValues';
import Loader from '../../../../components/loader/loader';
import { AppRoute } from '../../../../const/routes';
import { fieldsType } from '../../../../models/form';
import { registrationSchema } from '../../../../schemas/authentication';
import Authentication from '../Authentication';
import { useMakeRegistration } from 'api/requests/auth';

export function Registration() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoading, error, request } = useMakeRegistration();

  async function onSubmit(value: fieldsType) {
    const data = await request({ data: value });

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
        errorMessage={error?.message}
        loadingStatus={isLoading}
      />
      {isLoading && <Loader />}
    </div>
  );
}
