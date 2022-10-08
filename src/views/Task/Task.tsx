import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/button/Button';
import { deleteIcon, descriptionIcon, paperClipIcon } from '../../components/icons/Icons';
import Loader from '../../components/loader/loader';
import Modal from '../../components/modal/Modal';
import { Methods } from '../../const/APIMethod';
import { ErrorMessage } from '../../const/errorMessage';
import { taskURL } from '../../const/requestUrls';
import { useAxios } from '../../hooks/useAxios';
import { taskProps } from '../../models/task';
import { generateTaskBody } from '../../utils/dragAndDrop';

function dragStart(
  e: React.DragEvent<HTMLDivElement>,
  taskId: string,
  title: string,
  description: string,
  columnId: string,
  userId: string
) {
  e.stopPropagation();
  e.dataTransfer.setData('taskId', taskId);
  e.dataTransfer.setData('taskTitle', title);
  e.dataTransfer.setData('taskDescription', description);
  e.dataTransfer.setData('columnId', columnId);
  e.dataTransfer.setData('userId', userId);
  e.dataTransfer.setData('element', 'task');
}

function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault();
}

function Task({ id, title, description, columnId, userId, order, files }: taskProps) {
  const { t } = useTranslation();
  const { boardId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isModalActive, setIsModalActive] = useState(false);
  const { isLoading, isError, request } = useAxios({}, { dontFetchAtMount: true });

  async function deleteTask() {
    const taskData = await request({
      url: taskURL(boardId, columnId, id),
      method: Methods.DELETE,
    });

    if (taskData) {
      setIsModalActive(false);
    }
  }

  function openEditTask() {
    navigate(`${pathname}/columns/${columnId}/tasks/${id}`);
  }

  function openDeleteModal(e: React.MouseEvent<HTMLElement> | undefined) {
    e?.stopPropagation();
    setIsModalActive(true);
  }

  function closeDeleteModal() {
    setIsModalActive(false);
  }

  async function dropHandler(e: React.DragEvent<HTMLDivElement>) {
    if (e.dataTransfer.getData('element') === 'column') {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    const dropTaskId = e.dataTransfer.getData('taskId');
    const dropTaskTitle = e.dataTransfer.getData('taskTitle');
    const dropTaskDescription = e.dataTransfer.getData('taskDescription');
    const dropColumnId = e.dataTransfer.getData('columnId');
    if (columnId === dropColumnId) {
      const url = taskURL(boardId, columnId, dropTaskId);
      const data = generateTaskBody(dropTaskTitle, dropTaskDescription, dropColumnId);
      await request({
        url,
        method: Methods.PUT,
        data: {
          ...data,
          userId,
          order,
          boardId,
        },
      });
    } else {
      const url = taskURL(boardId, dropColumnId, dropTaskId);
      const data = generateTaskBody(dropTaskTitle, dropTaskDescription, columnId);

      await request({
        url,
        method: Methods.PUT,
        data: {
          ...data,
          userId,
          order,
          boardId,
        },
      });
    }
  }

  return (
    <>
      <div
        className="task"
        onClick={openEditTask}
        draggable={true}
        onDragOver={(e) => dragOverHandler(e)}
        onDragStart={(e) => dragStart(e, id, title, description, columnId, userId)}
        onDrop={(e) => dropHandler(e)}
      >
        <div className="task__title-wrapper">
          <div className="task__link">{title}</div>
          <Button handler={openDeleteModal} btnClass="task__delete_btn" icon={deleteIcon} />
        </div>

        <div className="task__icons-wrapper">
          <div>{descriptionIcon}</div>
          {!!files.length && <div>{paperClipIcon}</div>}
        </div>
      </div>
      {isLoading && <Loader />}
      {isModalActive && (
        <Modal
          formId="modalForm"
          handleCloseModal={closeDeleteModal}
          contentWrapperClassName="modal__delete"
          submitBtnName={t('buttons.delete')}
          submitHandler={deleteTask}
          isError={isError}
          errorText={ErrorMessage.SERVER_ERROR}
        >
          <p className="confirmation__text">{`${t('task.delete_task_message')} ${title}?`}</p>
        </Modal>
      )}
    </>
  );
}

export default Task;
