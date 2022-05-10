import { registrationFields } from '../../components/form/constants/fieldsOptions';
import { registrationValues } from '../../components/form/constants/initialValues';
import { AppRoute } from '../../const/routes';
import { instanceAxios } from '../../HTTP/configuration';
import { fieldsType } from '../../models/form';
import { registrationSchema } from '../../schemas/authentification';
import Authentification from '../authentification/Authentification';

export default function Registration() {
  async function onSubmit(value: fieldsType) {
    console.log(value);
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
