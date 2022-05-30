import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { descriptionIcon, editIcon, userIcon } from '../../components/icons/Icons';
import Input from '../../components/input/Input';
import Modal from '../../components/modal/Modal';
import ProcessingWrapper from '../../components/processingWrapper/ProcessingWrapper';
import { Methods } from '../../const/APIMethod';
import { boardURL, columnURL, taskURL } from '../../const/requestUrls';
import { useAxios } from '../../hooks/useAxios';
import { TColumn } from '../../models/column';
import { TTask } from '../../models/task';
import { useAppSelector } from '../../store/hooks';

export default function TaskEdit() {
  const { t } = useTranslation();
  const { updateBoard } = useOutletContext<{ updateBoard: () => void }>();
  const navigate = useNavigate();
  const { boardId, columnId, taskId } = useParams();
  const { login } = useAppSelector((state) => state.authorization);

  const {
    data: task,
    isLoading: taskLoading,
    isError: taskError,
  } = useAxios({
    url: taskURL(boardId, columnId, taskId),
    method: Methods.GET,
  });

  const {
    data: column,
    isLoading: columnLoading,
    isError: columnError,
  } = useAxios({
    url: columnURL(boardId, columnId),
    method: Methods.GET,
  });

  const { request } = useAxios({}, { dontFetchAtMount: true });

  function closeEdit() {
    navigate(boardURL(boardId));
  }

  async function updateTaskElement(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    updatedElement: string
  ) {
    if (task) {
      const { id, files, ...dataForRequest } = task as TTask;
      const newTaskData = { ...dataForRequest, [updatedElement]: e.target.value };

      const updateTaskOptions = {
        url: taskURL(boardId, columnId, taskId),
        method: Methods.PUT,
        data: newTaskData,
      };
      await request(updateTaskOptions);
      updateBoard();
    }
  }

  async function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    const file = target.files![0];
    if (task) {
      const { id } = task as TTask;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('taskId', id);
      const updateTaskOptions = {
        url: `/file`,
        method: Methods.POST,
        data: formData,
      };
      await request(updateTaskOptions);
      updateBoard();
    }
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
            {editIcon}
            <Input
              defaultValue={taskData?.title}
              inputClass="task__edit_title"
              labelClass="task__edit_label"
              onBlur={(e) => updateTaskElement(e, 'title')}
            />
          </div>
          <h4>
            {t('task.in_column')}
            <span>{` ${columnData?.title}`}</span>
          </h4>
          <div className="task__edit_description-wrapper">
            {userIcon}
            <h4 className="task__edit_text">{`${t('task.task_creator')}: ${login}`}</h4>
          </div>

          <div className="task__edit_description-wrapper">
            {descriptionIcon}
            <h4 className="task__edit_text">{t('task.task_description')}</h4>
          </div>

          <textarea
            className="task__edit_description-input"
            onBlur={(e) => updateTaskElement(e, 'description')}
            defaultValue={taskData?.description}
          />
          <Input type="file" onChange={(e) => uploadFile(e)} />
        </section>
      </ProcessingWrapper>
    </Modal>
  );
}
