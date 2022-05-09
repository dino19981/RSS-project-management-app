import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import Form from '../../components/form/Form';
import Modal from '../../components/modal/Modal';
import { authentificationProps } from '../../models/authentification';

export default function Authentification({
  formOptions,
  buttonText,
  link,
  linkText,
  answerText,
}: authentificationProps) {
  return (
    <Modal isShowFooter={false}>
      <Form {...formOptions}></Form>
      <p className="authentification__text">
        {answerText} <Link to={link}>{linkText}</Link>
      </p>
      <div className="authentification__footer">
        <Button
          type="submit"
          text={buttonText}
          formId={formOptions.formId}
          btnClass="authentification__button"
        />
      </div>
    </Modal>
  );
}
