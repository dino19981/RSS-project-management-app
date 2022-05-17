import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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

function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault();
  const target = e.target as HTMLDivElement;
  target.classList.add('drag');
}
function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
  const target = e.target as HTMLDivElement;
  target.classList.remove('drag');
}

type TProps = TColumn & {
  updateHandler: () => void;
};
function ColumnPreview({ id: columnId, order, title, tasks, updateHandler }: TProps) {
  const { pathname } = useLocation();
  const { boardId } = useParams();
  const [isModalActive, setIsModalActive] = useState(false);

  const { id: userId } = useAppSelector((state) => state.authorization);
  const { data, isLoading, isError, request } = useAxios({
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
    updateHandler();
    setIsModalActive(false);
  }

  async function dropHandler(e: React.DragEvent<HTMLDivElement>, order: number) {
    e.preventDefault();
    console.log('drop', columnId);
    // await request({
    //   url: `/boards/${boardId}/columns/${columnId}`,
    //   method: 'put',
    //   data: {
    //     title,
    //     order,
    //   },
    // });
    // await request();
  }

  return (
    <div
      className={`column-preview`}
      draggable={true}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDrop={(e) => dropHandler(e, 2)}
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
