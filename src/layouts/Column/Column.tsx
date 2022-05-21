import React, { memo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useAppSelector } from '../../store/hooks';
import ButtonWithModalForm from '../../components/buttonWithModalForm/ButtonWithModalForm';
import { useAxios } from '../../hooks/useAxios';
import { TColumn } from '../../models/column';
import { AppRoute } from '../../const/routes';
import { Methods } from '../../const/APIMethoods';
import Loader from '../../components/loader/loader';
import { ErrorMessage } from '../../const/errorMesages';
import Task from '../Task/Task';
import { TTask } from '../../models/task';
import { responses } from '../../models/useAxios';

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

function getActualTasks(columnData: responses | undefined, tasks: TTask[]) {
  if (columnData) {
    const { tasks } = columnData as TColumn;
    return tasks;
  }
  return tasks || [];
}

type TProps = TColumn & {
  updateBoard: () => void;
};
function Column({ id: columnId, order, title, tasks, updateBoard }: TProps) {
  const { pathname } = useLocation();
  const { boardId } = useParams();
  const [isModalActive, setIsModalActive] = useState(false);

  const { id: userId } = useAppSelector((state) => state.authorization);
  const {
    data: columnData,
    isLoading,
    isError,
    request,
  } = useAxios({}, { dontFetchAtMount: true });

  async function createTask(value: typeof schema) {
    const body = { ...value, order: tasks.length + 1, userId };
    const taskData = await request({
      url: `${AppRoute.BOARDS}/${boardId}/columns/${columnId}/tasks`,
      method: Methods.POST,
      data: body,
    });

    if (taskData) {
      updateBoard();
      setIsModalActive(false);
    }
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

  const realData = getActualTasks(columnData, tasks);

  return (
    <div
      className="column-preview"
      draggable={true}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDrop={(e) => dropHandler(e, 2)}
    >
      <div className="column-preview_title">{title}</div>
      {realData.map((task) => {
        return <Task key={task.id} {...task} columnId={columnId} updateColumn={request} />;
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
          onSubmit: createTask,
        }}
        isError={isError}
        errorText={ErrorMessage.SERVER_ERROR}
      />
      {isLoading && <Loader />}
    </div>
  );
}

export default memo(Column);
