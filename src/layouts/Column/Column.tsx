import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonWithModalForm from '../../components/buttonWithModalForm/ButtonWithModalForm';
import { createTaskFields } from '../../components/form/constants/fieldsOptions';
import { createTaskValues } from '../../components/form/constants/initialValues';
import Loader from '../../components/loader/loader';
import { Methods } from '../../const/APIMethoods';
import { ErrorMessage } from '../../const/errorMessage';
import { columnURL, tasksURL } from '../../const/requestUrls';
import { AppRoute } from '../../const/routes';
import { useAxios } from '../../hooks/useAxios';
import { TColumn, TColumnProps } from '../../models/column';
import { TGetBoardTask } from '../../models/task';
import { responses } from '../../models/useAxios';
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

  const { id: userId } = useAppSelector((state) => state.authorization);
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

  const actualTasks = getActualTasks(columnData, tasks);

  return (
    <div
      className="column-preview"
      draggable={true}
      onDragOver={(e) => dragOverHandler(e)}
      onDragStart={(e) => dragStart(e, columnId, title)}
      onDrop={(e) => dropHandler(e)}
    >
      <div className="column-preview_title">{title}</div>
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
    </div>
  );
}

export default Column;
