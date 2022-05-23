import { buttonWithModalFormProps } from '../../models/buttonWithModalForm';
import Button from '../button/Button';
import Form from '../form/Form';
import Modal from '../modal/Modal';

export default function ButtonWithModalForm({
  formOptions,
  buttonOptions,
  modalState,
  submitBtnName,
  errorText,
  isError,
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
        <Modal
          formId="modalForm"
          handleCloseModal={closeModal}
          submitBtnName={submitBtnName}
          isError={isError}
          errorText={errorText}
        >
          <Form formId="modalForm" {...formOptions}></Form>
        </Modal>
      )}
    </>
  );
}
