import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Button from '../../components/button/Button';
import ButtonWithModalForm from '../../components/buttonWithModalForm/ButtonWithModalForm';
import { createTaskFields, editColumnFields } from '../../components/form/constants/fieldsOptions';
import { createTaskValues } from '../../components/form/constants/initialValues';
import Form from '../../components/form/Form';
import { checkIcon, closeIcon, deleteIcon } from '../../components/icons/Icons';
import Loader from '../../components/loader/loader';
import Modal from '../../components/modal/Modal';
import Popover from '../../components/popover/Popover';
import { Methods } from '../../const/APIMethoods';
import { ErrorMessage } from '../../const/errorMessage';
import { columnURL, tasksURL } from '../../const/requestUrls';
import { useAxios } from '../../hooks/useAxios';
import { TColumn, TColumnProps } from '../../models/column';
import { TGetBoardTask } from '../../models/task';
import { responses } from '../../models/useAxios';
import { columSchema } from '../../schemas/column';
import { createTaskSchema } from '../../schemas/task';
import { useAppSelector } from '../../store/hooks';
import EmptyTaskPreview from '../Task/EmptyTaskPreview';
import Task from '../Task/Task';

const formOptions = {
  schema: createTaskSchema,
  initialValues: createTaskValues,
  fields: createTaskFields,
};

function dragStart(e: React.DragEvent<HTMLDivElement>, id: string, title: string) {
  e.stopPropagation();
  e.dataTransfer.setData('columnId', id);
  e.dataTransfer.setData('columnTitle', title);
}

function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault();
}

function getActualTasks(columnData: responses | undefined, tasks: TGetBoardTask[]) {
  if (columnData) {
    const { tasks } = columnData as TColumn;
    return tasks.sort((a, b) => a.order - b.order);
  }
  return tasks.sort((a, b) => a.order - b.order) || [];
}

function Column({ id: columnId, title, tasks, order, updateBoard }: TColumnProps) {
  const { t } = useTranslation();
  const { boardId } = useParams();
  const [isCreateTaskModalActive, setIsCreateTaskModalActive] = useState(false);
  const [isDeleteColumnModalActive, setIsDeleteColumnModalActive] = useState(false);
  const [isPopoverActive, setIsPopoverActive] = useState(false);
  const [columnTitleElement, setColumnTitleElement] = useState<HTMLDivElement | null>(null);

  const { id: userId } = useAppSelector((state) => state.authorization);
  const { isError: isUpdateTitleError, request: updateTitleRequest } = useAxios(
    {},
    { dontFetchAtMount: true }
  );
  const {
    data: columnData,
    isLoading,
    isError,
    request,
  } = useAxios({}, { dontFetchAtMount: true });

  async function createTask(value: typeof createTaskSchema) {
    const body = { ...value, userId };
    const taskData = await request({
      url: tasksURL(boardId, columnId),
      method: Methods.POST,
      data: body,
    });

    if (taskData) {
      request({
        url: columnURL(boardId, columnId),
        method: Methods.GET,
      });
      setIsCreateTaskModalActive(false);
    }
  }

  async function dropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const id = e.dataTransfer.getData('columnId');
    const title = e.dataTransfer.getData('columnTitle');
    if (!id || !title) return;
    if (id !== columnId) {
      await request({
        url: columnURL(boardId, id),
        method: Methods.PUT,
        data: {
          title,
          order,
        },
      });
    }
    updateBoard();
  }

  function openEditTitle() {
    setIsPopoverActive(true);
  }

  function closeEditTitle() {
    setIsPopoverActive(false);
  }

  async function updateTitle(value: typeof columSchema) {
    if (value.title === title) {
      setIsPopoverActive(false);
      return;
    }

    const body = { order, ...value };
    setIsPopoverActive(false);

    const columnData = await updateTitleRequest({
      url: columnURL(boardId, columnId),
      method: Methods.PUT,
      data: body,
    });

    if (columnData) {
      request({
        url: columnURL(boardId, columnId),
        method: Methods.GET,
      });
    }
  }

  async function deleteColumn() {
    const columnData = await request({
      url: columnURL(boardId, columnId),
      method: Methods.DELETE,
    });

    if (columnData) {
      updateBoard();
    }
  }

  function openDeleteModal(e?: React.MouseEvent<HTMLElement>) {
    e?.stopPropagation();
    setIsDeleteColumnModalActive(true);
  }

  function closeDeleteModal() {
    setIsDeleteColumnModalActive(false);
  }

  const addTaskOptions = {
    submitBtnName: 'add task',
    modalState: {
      isModalActive: isCreateTaskModalActive,
      setIsModalActive: setIsCreateTaskModalActive,
    },
    buttonOptions: { btnClass: 'task_create__btn', text: 'Add task' },
    formOptions: { ...formOptions, onSubmit: createTask },
    isError: isError,
    errorText: ErrorMessage.SERVER_ERROR,
  };

  const deleteColumnOptions = {
    formId: 'modalForm',
    handleCloseModal: closeDeleteModal,
    contentWrapperClassName: 'modal__delete',
    submitBtnName: t('buttons.delete'),
    submitHandler: deleteColumn,
    isError: isError,
    errorText: ErrorMessage.SERVER_ERROR,
  };

  const actualTasks = useMemo(
    () => getActualTasks(columnData, tasks),
    [JSON.stringify(columnData), JSON.stringify(tasks)]
  );

  return (
    <div
      className="column"
      draggable={true}
      onDragOver={(e) => dragOverHandler(e)}
      onDragStart={(e) => dragStart(e, columnId, title)}
      onDrop={(e) => dropHandler(e)}
    >
      <div ref={setColumnTitleElement} onClick={openEditTitle} className="column__title-wrapper">
        <h4 className="column__title">{title}</h4>
        <Button handler={openDeleteModal} btnClass="task__delete_btn" icon={deleteIcon} />
      </div>

      {actualTasks.map((task) => {
        return (
          <Task
            key={task.id}
            {...task}
            columnId={columnId}
            updateColumn={request}
            updateBoard={updateBoard}
          />
        );
      })}

      <EmptyTaskPreview tasks={tasks} boardId={boardId} columnId={columnId} update={updateBoard} />
      <ButtonWithModalForm {...addTaskOptions} />

      {isPopoverActive && (
        <Popover
          placement="bottom-start"
          onClose={closeEditTitle}
          reference={columnTitleElement}
          popoverWrapperClass="popover__gray-wrapper"
        >
          <div className="column__title-edit">
            <div
              className="column__form-wrapper"
              style={{ width: columnTitleElement?.clientWidth }}
            >
              <Form
                schema={columSchema}
                initialValues={{ title }}
                fields={editColumnFields}
                formId="editTitle"
                onSubmit={updateTitle}
              />
            </div>
            <div className="column__title-buttons">
              <Button
                icon={checkIcon}
                btnClass="button__check-icon"
                formId="editTitle"
                type="submit"
              />
              <Button icon={closeIcon} btnClass="button__cancel-icon" handler={closeEditTitle} />
            </div>
          </div>

          {isUpdateTitleError && <p className="input__error">Error</p>}
        </Popover>
      )}
      {isDeleteColumnModalActive && (
        <Modal {...deleteColumnOptions}>
          <p className="confirmation__text">{`${t('column.delete_column_message')} ${title}?`}</p>
        </Modal>
      )}
      {isLoading && <Loader />}
    </div>
  );
}

export default Column;
