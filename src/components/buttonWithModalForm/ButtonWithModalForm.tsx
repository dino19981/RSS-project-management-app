import { buttonWithModalFormProps } from '../../models/buttonWithModalForm';
import Button from '../button/Button';
import Form from '../form/Form';
import Modal from '../modal/Modal';

export default function ButtonWithModalForm({
  formOptions,
  buttonOptions,
  modalOptions,
  modalState,
  questionText,
}: buttonWithModalFormProps) {
  const { isModalActive, setIsModalActive } = modalState;

  function closeModal() {
    setIsModalActive(false);
  }

  function openModal() {
    setIsModalActive(true);
  }

  return (
    <>
      <Button handler={openModal} {...buttonOptions} />
      {isModalActive && (
        <Modal {...modalOptions} formId="modalForm" handleCloseModal={closeModal}>
          {questionText && <p className="confirmation__text">{questionText}</p>}
          {formOptions && <Form formId="modalForm" {...formOptions} />}
        </Modal>
      )}
    </>
  );
}
