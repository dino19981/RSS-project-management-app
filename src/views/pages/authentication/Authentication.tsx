import { Link } from 'react-router-dom';
import Button from '../../../components/button/Button';
import Form from '../../../components/form/Form';
import { authenticationProps } from '../../../models/authentication';
import { ErrorMessage } from 'components/errorMessage/ErrorMessage';

export default function Authentication({
  formOptions,
  buttonText,
  link,
  linkText,
  questionText,
  errorMessage,
  loadingStatus,
}: authenticationProps) {
  return (
    <section className="authentication__inner">
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form {...formOptions}></Form>
      <p className="authentication__text">
        {questionText}{' '}
        <Link className="authentication__link" to={link}>
          {linkText}
        </Link>
      </p>
      <div className="authentication__footer">
        <Button
          isDisabled={loadingStatus}
          type="submit"
          text={buttonText}
          formId={formOptions.formId}
          btnClass="authentication__button"
        />
      </div>
    </section>
  );
}
