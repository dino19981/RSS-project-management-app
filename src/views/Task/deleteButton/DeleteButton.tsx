import { t } from 'i18next';
import React, { useState } from 'react';
import Button from '../../../components/button/Button';
import { deleteIcon } from '../../../components/icons/Icons';
import Modal from '../../../components/modal/Modal';
import { ErrorMessage } from '../../../const/errorMessage';

type Props = {
  title: string;
};

export default function DeleteButton({ title }: Props) {
  const [isModalActive, setIsModalActive] = useState(false);

  function closeDeleteModal() {
    setIsModalActive(false);
  }

  function openDeleteModal() {
    setIsModalActive(true);
  }

  async function deleteTask() {
    // const taskData = await request({
    //   url: taskURL(boardId, columnId, id),
    //   method: Methods.DELETE,
    // });
    // if (taskData) {
    //   setIsModalActive(false);
    // }
  }

  return (
    <>
      <Button handler={openDeleteModal} btnClass="task__delete_btn" icon={deleteIcon} />

      {isModalActive && (
        <Modal
          formId="modalForm"
          handleCloseModal={closeDeleteModal}
          contentWrapperClassName="modal__delete"
          submitBtnName={t('buttons.delete')}
          submitHandler={deleteTask}
          // isError={isError}
          errorText={ErrorMessage.SERVER_ERROR}
        >
          <p className="confirmation__text">{`${t('task.delete_task_message')} ${title}?`}</p>
        </Modal>
      )}
    </>
  );
}
