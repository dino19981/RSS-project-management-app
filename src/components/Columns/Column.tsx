import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { TColumn } from '../../models/column';
import { TTask } from '../../models/task';
import ButtonWithModalForm from '../buttonWithModalForm/ButtonWithModalForm';
import TaskPreview from '../Task/TaskPreview';

const fakeTasks = [
  {
    id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
    title: 'Task: pet the cat',
    order: 1,
    done: false,
    description: 'Domestic cat needs to be stroked gently',
    userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
    files: [
      {
        filename: 'foto.jpg',
        fileSize: 6105000,
      },
    ],
  },
  {
    id: '6e3abe9c-ceb1-40fa-9a04-234234234',
    title: 'Task:qwqereertert',
    order: 2,
    done: false,
    description: 'D123123123ly',
    userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
    files: [],
  },
];

const schema = yup
  .object()
  .shape({
    title: yup.string().trim().required(),
  })
  .required();

const initialValues = {
  title: '',
};

const fields = [
  //TODO разобраться с полями
  { name: 'title', errorMessage: 'Title is required', placeholder: 'Column Title' },
];

const formOptions = {
  schema,
  initialValues,
  fields,
};

function Column() {
  let tasks: undefined | TTask[];
  //fake data
  const column: undefined | TColumn = {
    id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f',
    title: 'Backlog',
    order: 1,
    tasks: [
      {
        id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
        title: 'Task: pet the cat',
        order: 1,
        done: false,
        description: 'Domestic cat needs to be stroked gently',
        userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
        files: [
          {
            filename: 'foto.jpg',
            fileSize: 6105000,
          },
        ],
      },
    ],
  };
  useEffect(() => {
    //TODO Загрузка  колонки /boards/:boardId/columns/:columnId
  }, []);

  const [isModalActive, setIsModalActive] = useState(false);

  function editColumnHandler(value: typeof schema) {
    //TODO ADD API REQuest
    console.log('edit column', value);
  }

  return (
    <div className="columns_wrapper">
      <div className="column">
        {column && (
          <div className="column_title">
            {column.title}
            <ButtonWithModalForm
              submitBtnName="save column"
              modalState={{ isModalActive, setIsModalActive }}
              buttonOptions={{
                btnClass: 'column_create__btn',
                type: 'button',
                text: 'edit column',
              }}
              formOptions={{
                ...formOptions,
                onSubmit: editColumnHandler,
                buttonOptions: { type: 'button' },
              }}
            />
          </div>
        )}

        {fakeTasks &&
          fakeTasks.map((task) => {
            return <TaskPreview key={task.id} {...task} />;
          })}
      </div>
    </div>
  );
}

export default Column;
