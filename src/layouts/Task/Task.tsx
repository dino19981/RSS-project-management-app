<<<<<<< HEAD
import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Methods } from '../../const/APIMethoods';
import { AppRoute } from '../../const/routes';
import { useAxios } from '../../hooks/useAxios';
import { TGetBoardTask } from '../../models/task';
import { generateTaskBody, generateTaskURL } from '../../utils/dragAndDrop';

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

type TProps = TGetBoardTask & {
  columnId: string;
  update: () => Promise<void>;
};

function TaskPreview({ id: taskId, title, description, order, userId, columnId, update }: TProps) {
  const { pathname } = useLocation();

  const { request } = useAxios({});
  const { boardId } = useParams();

  const urlToTask = columnId
    ? pathname + `${AppRoute.COLUMNS}/${columnId}${AppRoute.TASKS}/${taskId}`
    : pathname + `${AppRoute.TASKS}/${taskId}`;

  async function dropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    console.log('taskdrop');
    const dropTaskId = e.dataTransfer.getData('taskId');
    const dropTaskTitle = e.dataTransfer.getData('taskTitle');
    const dropTaskDescription = e.dataTransfer.getData('taskDescription');
    const dropColumnId = e.dataTransfer.getData('columnId');
    if (columnId === dropColumnId) {
      const url = generateTaskURL(boardId, columnId, dropTaskId);
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
      const url = generateTaskURL(boardId, dropColumnId, dropTaskId);
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
    await update();
  }

  return (
    <div
      className="task-preview"
      draggable={true}
      onDragOver={(e) => dragOverHandler(e)}
      onDragStart={(e) => dragStart(e, taskId, title, description, columnId, userId)}
      onDrop={(e) => dropHandler(e)}
    >
      <Link to={urlToTask} className="task_link">
        {title}
      </Link>
    </div>
=======
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/button/Button';
import { deleteTaskfields } from '../../components/form/constants/fieldsOptions';
import Form from '../../components/form/Form';
import Loader from '../../components/loader/loader';
import Modal from '../../components/modal/Modal';
import { Methods } from '../../const/APIMethoods';
import { ErrorMessage } from '../../const/errorMesages';
import { AppRoute } from '../../const/routes';
import { useAxios } from '../../hooks/useAxios';
import { taskProps } from '../../models/task';
import { deleteBoardSchema } from '../../schemas/boards';

const formOptions = {
  schema: deleteBoardSchema,
  fields: deleteTaskfields,
};

function Task({ id, title, description, columnId, updateColumn }: taskProps) {
  const { boardId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isModalActive, setIsModalActive] = useState(false);
  const { isLoading, isError, request } = useAxios({}, { dontFetchAtMount: true });

  async function deleteTask() {
    const taskData = await request({
      url: `${AppRoute.BOARDS}/${boardId}/columns/${columnId}/tasks/${id}`,
      method: Methods.DELETE,
    });

    if (taskData) {
      updateColumn({
        url: `${AppRoute.BOARDS}/${boardId}/columns/${columnId}`,
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

  return (
    <>
      <div className="task" onClick={openEditTask}>
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
>>>>>>> develop
  );
}

export default TaskPreview;
