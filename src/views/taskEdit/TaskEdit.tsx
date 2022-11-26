import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { descriptionIcon, editIcon, userIcon } from '../../components/icons/Icons';
import Input from '../../components/input/Input';
import Modal from '../../components/modal/Modal';
import { boardURL } from '../../const/requestUrls';
import { RootState } from '../../models/store';
import { TGetBoardTask } from '../../models/task';
import { useAppSelector } from '../../store';
import { addFileToTask, updateTask } from '../../store/board';

function TaskEdit({ getTaskData, updateTask, addFileToTask }: PropsFromRedux) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { boardId, columnId, taskId } = useParams();
  const imageRef = useRef();

  const [taskData] = useState<(TGetBoardTask & { columnTitle: string }) | undefined>(
    getTaskData(columnId!, taskId!)
  );
  const userLogin = useAppSelector((state) => state.authorization.login);

  function closeEdit() {
    navigate(boardURL(boardId));
  }

  async function updateTaskProperty(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    updatedElement: string
  ) {
    if (!taskData || !boardId || !columnId || !taskId) return;

    const { id, files, columnTitle, ...dataForRequest } = taskData;
    const newTaskData = {
      ...dataForRequest,
      [updatedElement]: e.target.value,
      boardId,
      columnId,
      taskId,
    };

    updateTask(newTaskData);
  }

  async function uploadFile({ target }: React.ChangeEvent<HTMLInputElement>) {
    const file = target.files![0];
    if (!taskData) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('taskId', taskData.id);

    addFileToTask({ formData, fileName: file.name, taskId: taskData.id });
  }

  // const isLoading = taskLoading || columnLoading;
  // const isError = taskError || columnError;
  // const taskData = task as TTask;
  // const columnData = column as TColumn;

  return (
    <Modal
      handleCloseModal={closeEdit}
      contentWrapperClassName="task__edit"
      isDontShowFooter={true}
    >
      {taskData ? (
        <section className="task__edit_inner">
          <div className="task__edit_title-wrapper">
            {editIcon}
            <Input
              defaultValue={taskData.title}
              inputClass="task__edit_title"
              labelClass="task__edit_label"
              onBlur={(e) => updateTaskProperty(e, 'title')}
            />
          </div>
          <h4>
            {t('task.in_column')}
            <span>{` ${taskData.columnTitle}`}</span>
          </h4>
          <div className="task__edit_description-wrapper">
            {userIcon}
            <h4 className="task__edit_text">{`${t('task.task_creator')}: ${userLogin}`}</h4>
          </div>

          <div className="task__edit_description-wrapper">
            {descriptionIcon}
            <h4 className="task__edit_text">{t('task.task_description')}</h4>
          </div>

          <textarea
            className="task__edit_description-input"
            onBlur={(e) => updateTaskProperty(e, 'description')}
            defaultValue={taskData?.description}
          />
          <Input type="file" onChange={(e) => uploadFile(e)} />
        </section>
      ) : (
        <h2>Задача удалена</h2>
      )}
    </Modal>
  );
}

const mapStateToProps = (state: RootState) => {
  // console.log(ownProps.match.params, state);

  return {
    getTaskData(columnId: string, taskId: string) {
      const column = state.board.board.columns.find(({ id }) => id === columnId);
      if (!column) return undefined;

      const taskData = column.tasks.find(({ id }) => id === taskId);

      if (taskData) {
        return { ...taskData, columnTitle: column.title };
      }
    },
  };
};

const mapDispatchToProps = {
  updateTask,
  addFileToTask,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TaskEdit);
