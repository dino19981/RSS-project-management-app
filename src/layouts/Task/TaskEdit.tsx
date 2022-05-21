import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/button/Button';
import Loader from '../../components/loader/loader';
import Modal from '../../components/modal/Modal';
import ProcessingWrapper from '../../components/processingWrapper/ProcessingWrapper';
import { AppRoute } from '../../const/routes';
import { useAxios } from '../../hooks/useAxios';
import { TTask } from '../../models/task';
import { useAppSelector } from '../../store/hooks';

export default function TaskEdit() {
  const { boardId, columnId, taskId } = useParams();
  const { name, login } = useAppSelector((state) => state.authorization);
  const navigate = useNavigate();

  const {
    data: task,
    isLoading: taskLoading,
    isError: taskError,
    request: updateTask,
  } = useAxios({
    url: `${AppRoute.BOARDS}/${boardId}/columns/${columnId}/tasks/${taskId}`,
    method: 'get',
  });

  const {
    data: column,
    isLoading: columnLoading,
    isError: columnError,
  } = useAxios({
    url: `${AppRoute.BOARDS}/${boardId}/columns/${columnId}`,
    method: 'get',
  });

  function closeEdit() {
    navigate(`${AppRoute.BOARDS}/${boardId}`);
  }

  const taskData = task as TTask;

  return (
    <Modal handleCloseModal={closeEdit} contentClassName="task__edit" isDontShowFooter={true}>
      <ProcessingWrapper isError={taskError} isLoading={taskLoading} errortext="Error">
        <section className="task__edit_inner">
          <div className="task__edit_title-wrapper">
            <svg className="task__edit_icon">
              <use xlinkHref="#task-icon" />
            </svg>
            <h2 className="task__edit_title">{taskData?.title}</h2>
          </div>
          <h4 className="task__edit_text">{`Создатель: ${login}`}</h4>
          <div className="task__edit_description-wrapper">
            <svg className="task__edit_icon">
              <use xlinkHref="#description-icon" />
            </svg>
            <h4 className="task__edit_text">Описание</h4>
            <Button text="Изменить" btnClass="task__edit_description-edit" />
          </div>
          <textarea
            className="task__edit_description-input"
            placeholder={taskData?.description || 'Добавить описание'}
          ></textarea>
          <Button text="Сохранить" />
        </section>
      </ProcessingWrapper>
    </Modal>
  );
}
