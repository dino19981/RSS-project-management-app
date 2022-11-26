import { t } from 'i18next';
import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../../../components/button/Button';
import { deleteIcon } from '../../../components/icons/Icons';
import Modal from '../../../components/modal/Modal';
import { ErrorMessage } from '../../../const/errorMessage';
import { deleteTask } from '../../../store/board';

type Props = {
  title: string;
  taskId: string;
  columnId: string;
};

function DeleteButton({ title, taskId, columnId, deleteTask }: Props & PropsFromRedux) {
  const { boardId } = useParams();
  const [isModalActive, setIsModalActive] = useState(false);

  function closeDeleteModal() {
    setIsModalActive(false);
  }

  function openDeleteModal() {
    setIsModalActive(true);
  }

  async function makeDeleteTask() {
    if (!boardId || !columnId) return;

    const response = await deleteTask({ boardId, columnId, taskId });

    if (response.meta.requestStatus === 'fulfilled') {
      closeDeleteModal();
    }
  }

  return (
    <>
      <Button handler={openDeleteModal} btnClass="button__delete_hidden" icon={deleteIcon} />

      {isModalActive && (
        <Modal
          formId="modalForm"
          handleCloseModal={closeDeleteModal}
          contentWrapperClassName="modal__delete"
          submitBtnName={t('buttons.delete')}
          submitHandler={makeDeleteTask}
          // isError={isError}
          errorText={ErrorMessage.SERVER_ERROR}
        >
          <p className="confirmation__text">{`${t('task.delete_task_message')} ${title}?`}</p>
        </Modal>
      )}
    </>
  );
}

const mapDispatchToProps = {
  deleteTask,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DeleteButton);
