import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import ButtonWithModalForm from '../../components/buttonWithModalForm/ButtonWithModalForm';
import { useAxios } from '../../hooks/useAxios';
import { TColumn } from '../../models/column';
import Task from '../Task/Task';
import { columSchema } from '../../schemas/column';
import { columnValues } from '../../components/form/constants/initialValues';
import { columnfields } from '../../components/form/constants/fieldsOptions';
import { AppRoute } from '../../const/routes';
import { Methods } from '../../const/APIMethoods';
import EmptyTaskPreview from '../Task/EmptyTaskPreview';

const formOptions = {
  schema: columSchema,
  initialValues: columnValues,
  fields: columnfields,
};

function dragStart(e: React.DragEvent<HTMLDivElement>, id: string, title: string) {
  e.dataTransfer.setData('columnId', id);
  e.dataTransfer.setData('columnTitle', title);
}

function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault();
}

type TProps = {
  currentColumn: TColumn;
  updateHandler: () => Promise<void>;
};

function ColumnPreview({ currentColumn, updateHandler }: TProps) {
  const { id: columnId, title, tasks } = currentColumn;
  const { boardId } = useParams();
  const [isModalActive, setIsModalActive] = useState(false);

  const { id: userId } = useAppSelector((state) => state.authorization);
  const { request } = useAxios({
    url: `${AppRoute.BOARDS}/${boardId}`,
    method: Methods.GET,
  });

  async function createTaskHandler(value: typeof columSchema) {
    const body = { ...value, order: tasks.length + 1, userId };
    await request({
      url: `${AppRoute.BOARDS}/${boardId}${AppRoute.COLUMNS}/${columnId}${AppRoute.TASKS}`,
      method: Methods.POST,
      data: body,
    });
    setIsModalActive(false);
  }

  async function dropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const id = e.dataTransfer.getData('columnId');
    const title = e.dataTransfer.getData('columnTitle');
    if (!id || !title) return;
    if (id !== currentColumn.id) {
      await request({
        url: `${AppRoute.BOARDS}/${boardId}${AppRoute.COLUMNS}/${id}`,
        method: Methods.PUT,
        data: {
          title,
          order: currentColumn.order,
        },
      });
      await updateHandler();
    }
  }

  return (
    <div
      className={`column-preview`}
      draggable={true}
      onDragOver={(e) => dragOverHandler(e)}
      onDragStart={(e) => dragStart(e, columnId, title)}
      onDrop={(e) => dropHandler(e)}
    >
      <div className="column-preview_title">{title}</div>
      {tasks &&
        tasks.map((task) => {
          return <Task key={task.id} {...task} columnId={columnId} update={updateHandler} />;
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
          onSubmit: createTaskHandler,
          buttonOptions: {},
        }}
      />
    </div>
  );
}

export default ColumnPreview;
