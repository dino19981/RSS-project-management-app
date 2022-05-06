import React from 'react';
import { buttonWithModalFormProps } from '../../models/buttonWithModalForm';
import Form from '../form/Form';
import Modal from '../modal/Modal';

export default function ButtonWithModalForm({
  formOptions,
  buttonOptions,
  modalState,
  submitBtnName,
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
      <button onClick={openModal}>openModal</button>
      {isModalActive && (
        <Modal formId="modalForm" handleCloseModal={closeModal} submitBtnName={submitBtnName}>
          <Form formId="modalForm" {...formOptions}></Form>
        </Modal>
      )}
    </>
  );
}
