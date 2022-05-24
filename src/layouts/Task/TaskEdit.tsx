import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../components/input/Input';
import Modal from '../../components/modal/Modal';
import ProcessingWrapper from '../../components/processingWrapper/ProcessingWrapper';
import { Methods } from '../../const/APIMethoods';
import { AppRoute } from '../../const/routes';
import { useAxios } from '../../hooks/useAxios';
import { TColumn } from '../../models/column';
import { TTask } from '../../models/task';
import { useAppSelector } from '../../store/hooks';

export default function TaskEdit() {
  const navigate = useNavigate();
  const { boardId, columnId, taskId } = useParams();
  const { login } = useAppSelector((state) => state.authorization);

  const {
    data: task,
    isLoading: taskLoading,
    isError: taskError,
  } = useAxios({
    url: `${AppRoute.BOARDS}/${boardId}/columns/${columnId}/tasks/${taskId}`,
    method: Methods.GET,
  });

  const {
    data: column,
    isLoading: columnLoading,
    isError: columnError,
  } = useAxios({
    url: `${AppRoute.BOARDS}/${boardId}/columns/${columnId}`,
    method: Methods.GET,
  });

  const { request } = useAxios({}, { dontFetchAtMount: true });

  function closeEdit() {
    navigate(`${AppRoute.BOARDS}/${boardId}`);
  }

  function updateTaskElement(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    updatedElement: string
  ) {
    if (task) {
      const { id, files, ...dataForRequest } = task as TTask;
      const newTaskData = { ...dataForRequest, [updatedElement]: e.target.value };

      const updateTaskOptions = {
        url: `${AppRoute.BOARDS}/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: Methods.PUT,
        data: newTaskData,
      };
      request(updateTaskOptions);
    }
  }

  function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);

    // if (task) {
    //   const { id } = task as TTask;
    //   const newTaskData = { taskId: id, file: e.target.value };

    //   const updateTaskOptions = {
    //     url: `/file`,
    //     method: Methods.POST,
    //     data: newTaskData,
    //   };
    //   request(updateTaskOptions);
    // }
  }

  const isLoading = taskLoading || columnLoading;
  const isError = taskError || columnError;
  const taskData = task as TTask;
  const columnData = column as TColumn;

  return (
    <Modal
      handleCloseModal={closeEdit}
      contentWrapperClassName="task__edit"
      isDontShowFooter={true}
    >
      <ProcessingWrapper isError={isError} isLoading={isLoading} errortext="Error">
        <section className="task__edit_inner">
          <div className="task__edit_title-wrapper">
            <svg className="task__edit_icon" style={{ width: '20px', height: '20px' }}>
              <use xlinkHref="#task-icon" />
            </svg>
            <Input
              defaultValue={taskData?.title}
              inputClass="task__edit_title"
              onBlur={(e) => updateTaskElement(e, 'title')}
            />
          </div>
          <h4>
            В колонке
            <span>{` ${columnData?.title}`}</span>
          </h4>
          <div className="task__edit_description-wrapper">
            <svg className="task__edit_icon" style={{ width: '20px', height: '20px' }}>
              <use xlinkHref="#user-icon" />
            </svg>
            <h4 className="task__edit_text">{`Создатель: ${login}`}</h4>
          </div>

          <div className="task__edit_description-wrapper">
            <svg className="task__edit_icon" style={{ width: '20px', height: '20px' }}>
              <use xlinkHref="#description-icon" />
            </svg>
            <h4 className="task__edit_text">Описание</h4>
          </div>

          <textarea
            className="task__edit_description-input"
            onBlur={(e) => updateTaskElement(e, 'description')}
            defaultValue={taskData?.description || 'Добавить описание'}
          />
          <Input type="file" onChange={(e) => uploadFile(e)} />
        </section>
      </ProcessingWrapper>
    </Modal>
  );
}
