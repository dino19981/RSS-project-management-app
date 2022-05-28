import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/button/Button';
import ButtonWithModalForm from '../../components/buttonWithModalForm/ButtonWithModalForm';
import { columnfields, createTaskFields } from '../../components/form/constants/fieldsOptions';
import { createTaskValues } from '../../components/form/constants/initialValues';
import Form from '../../components/form/Form';
import { checkIcon, closeIcon } from '../../components/icons/Icons';
import Loader from '../../components/loader/loader';
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
  e.dataTransfer.setData('columnId', id);
  e.dataTransfer.setData('columnTitle', title);
}

function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault();
}

function getActualTasks(columnData: responses | undefined, tasks: TGetBoardTask[]) {
  if (columnData) {
    const { tasks } = columnData as TColumn;
    return tasks;
  }
  return tasks || [];
}

function Column({ id: columnId, title, tasks, order, updateHandler }: TColumnProps) {
  const { boardId } = useParams();
  const [isModalActive, setIsModalActive] = useState(false);
  const [isPopoverActive, setIsPopoverActive] = useState(false);
  const [columnTitle, setColumnTitle] = useState<HTMLDivElement | null>(null);

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
      setIsModalActive(false);
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
      request({
        url: columnURL(boardId, columnId),
        method: Methods.GET,
      });
      updateHandler();
    }
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
      updateHandler();
    }
  }

  const actualTasks = getActualTasks(columnData, tasks);

  return (
    <div
      className="column-preview"
      draggable={true}
      onDragOver={(e) => dragOverHandler(e)}
      onDragStart={(e) => dragStart(e, columnId, title)}
      onDrop={(e) => dropHandler(e)}
    >
      <div ref={setColumnTitle} onClick={openEditTitle} className="column-preview_title">
        {title}
      </div>

      {actualTasks.map((task) => {
        return <Task key={task.id} {...task} columnId={columnId} updateColumn={request} />;
      })}
      <EmptyTaskPreview
        tasks={tasks}
        boardId={boardId}
        columnId={columnId}
        update={updateHandler}
      />
      <ButtonWithModalForm
        submitBtnName="add task"
        modalState={{ isModalActive, setIsModalActive }}
        buttonOptions={{
          btnClass: 'task_create__btn',
          text: 'Add task',
        }}
        formOptions={{
          ...formOptions,
          onSubmit: createTask,
        }}
        isError={isError}
        errorText={ErrorMessage.SERVER_ERROR}
      />
      {isLoading && <Loader />}
      {isPopoverActive && (
        <Popover placement="bottom-start" onClose={closeEditTitle} reference={columnTitle}>
          <div className="column__title-edit">
            <div className="column__form-wrapper" style={{ width: columnTitle?.clientWidth }}>
              <Form
                schema={columSchema}
                initialValues={{ title }}
                fields={columnfields}
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
    </div>
  );
}

export default Column;
