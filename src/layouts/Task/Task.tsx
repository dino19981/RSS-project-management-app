import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/button/Button';
import { deleteTaskfields } from '../../components/form/constants/fieldsOptions';
import Form from '../../components/form/Form';
import Loader from '../../components/loader/loader';
import Modal from '../../components/modal/Modal';
import { Methods } from '../../const/APIMethoods';
import { ErrorMessage } from '../../const/errorMesages';
import { columnURL, taskURL } from '../../const/requestUrls';
import { AppRoute } from '../../const/routes';
import { useAxios } from '../../hooks/useAxios';
import { taskProps } from '../../models/task';
import { deleteBoardSchema } from '../../schemas/boards';
import { generateTaskBody } from '../../utils/dragAndDrop';

const formOptions = {
  schema: deleteBoardSchema,
  fields: deleteTaskfields,
};

function dragStart(
  e: React.DragEvent<HTMLDivElement>,
  taskId: string,
  title: string,
  description: string,
  columnId: string,
  userId: string
) {
  e.dataTransfer.setData('taskId', taskId);
  e.dataTransfer.setData('taskTitle', title);
  e.dataTransfer.setData('taskDescription', description);
  e.dataTransfer.setData('columnId', columnId);
  e.dataTransfer.setData('userId', userId);
}

function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault();
}

function Task({ id, title, description, columnId, updateColumn, userId, order }: taskProps) {
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
      updateColumn({
        url: columnURL(boardId, columnId),
        method: Methods.GET,
      });
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
    e.preventDefault();
    e.stopPropagation();
    console.log('taskdrop');
    const dropTaskId = e.dataTransfer.getData('taskId');
    const dropTaskTitle = e.dataTransfer.getData('taskTitle');
    const dropTaskDescription = e.dataTransfer.getData('taskDescription');
    const dropColumnId = e.dataTransfer.getData('columnId');
    if (columnId === dropColumnId) {
      const url = taskURL(boardId, columnId, dropTaskId);
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
    updateColumn({
      url: columnURL(boardId, columnId),
      method: Methods.GET,
    });
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
        <div className="task__link">{title}</div>
        <Button
          handler={openDeleteModal}
          btnClass="task__delete_btn"
          icon={
            <svg>
              <use xlinkHref="#delete-icon" />
            </svg>
          }
        />
        {isLoading && <Loader />}
      </div>
      {isModalActive && (
        <Modal
          formId="modalForm"
          handleCloseModal={closeDeleteModal}
          submitBtnName="Удалить"
          isError={isError}
          errorText={ErrorMessage.SERVER_ERROR}
        >
          <Form
            formId="modalForm"
            {...formOptions}
            initialValues={{ title }}
            onSubmit={deleteTask}
          />
        </Modal>
      )}
    </>
  );
}

export default Task;
