import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useAppSelector } from '../../store/hooks';
import ButtonWithModalForm from '../../components/buttonWithModalForm/ButtonWithModalForm';
import { useAxios } from '../../hooks/useAxios';
import { TColumn } from '../../models/column';
import TaskPreview from '../Task/TaskPreview';

const schema = yup
  .object()
  .shape({
    title: yup.string().trim().required(),
    description: yup.string().trim().required(),
  })
  .required();

const initialValues = {
  title: '',
  description: '',
};

const fields = [
  //TODO разобраться с полями
  { name: 'title', errorMessage: 'Title is required', placeholder: 'Task Title' },
  { name: 'description', errorMessage: 'description is required', placeholder: 'description' },
];

const formOptions = {
  schema,
  initialValues,
  fields,
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
    url: `/boards/${boardId}`,
    method: 'get',
  });

  async function createTaskHandler(value: typeof schema) {
    const body = { ...value, order: tasks.length + 1, userId };
    await request({
      url: `/boards/${boardId}/columns/${columnId}/tasks`,
      method: 'post',
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
        url: `/boards/${boardId}/columns/${id}`,
        method: 'put',
        data: {
          title,
          order: currentColumn.order,
        },
      });
    }
    await updateHandler();
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
          return <TaskPreview key={task.id} {...task} columnId={columnId} />;
        })}

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
