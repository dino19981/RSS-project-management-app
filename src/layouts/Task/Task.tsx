import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ButtonWithModalForm from '../../components/buttonWithModalForm/ButtonWithModalForm';
import { deleteTaskfields } from '../../components/form/constants/fieldsOptions';
import Loader from '../../components/loader/loader';
import { Methods } from '../../const/APIMethoods';
import { ErrorMessage } from '../../const/errorMesages';
import { AppRoute } from '../../const/routes';
import { useAxios } from '../../hooks/useAxios';
import { TTask } from '../../models/task';
import { deleteBoardSchema } from '../../schemas/boards';

const formOptions = {
  schema: deleteBoardSchema,
  fields: deleteTaskfields,
};

type TProps = TTask & {
  columnId?: string;
  updateColumn: ({ url, method }: { url: string; method: string }) => void;
};

function Task({ id, title, description, order, userId, done, columnId, updateColumn }: TProps) {
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

  return (
    <div className="task" onClick={openEditTask}>
      <div className="task__link">{title}</div>
      <ButtonWithModalForm
        submitBtnName="delete"
        modalState={{ isModalActive, setIsModalActive }}
        buttonOptions={{
          btnClass: 'task__delete_btn',
          icon: (
            <svg>
              <use xlinkHref="#delete-icon" />
            </svg>
          ),
        }}
        formOptions={{
          ...formOptions,
          initialValues: { title },
          onSubmit: deleteTask,
        }}
        isError={isError}
        errorText={ErrorMessage.SERVER_ERROR}
      />
      {isLoading && <Loader />}
    </div>
  );
}

export default Task;
