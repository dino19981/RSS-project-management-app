import { Link } from 'react-router-dom';
import Button from '../../../components/button/Button';
import Form from '../../../components/form/Form';
import { authentificationProps } from '../../../models/authentification';

export default function Authentification({
  formOptions,
  buttonText,
  link,
  linkText,
  questionText,
  errorMessage,
  loadingStatus,
}: authentificationProps) {
  return (
    <section className="authentification__inner">
      {errorMessage && <p className="authentification__error">{errorMessage}</p>}
      <Form {...formOptions}></Form>
      <p className="authentification__text">
        {questionText}{' '}
        <Link className="authentification__link" to={link}>
          {linkText}
        </Link>
      </p>
      <div className="authentification__footer">
        <Button
          isDisabled={loadingStatus}
          type="submit"
          text={buttonText}
          formId={formOptions.formId}
          btnClass="authentification__button"
        />
      </div>
    </section>
  );
}
