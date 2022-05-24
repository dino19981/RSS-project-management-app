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
  );
}

export default Task;
