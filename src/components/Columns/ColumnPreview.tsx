import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { TColumn } from '../../models/column';
import ButtonWithModalForm from '../buttonWithModalForm/ButtonWithModalForm';
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

function ColumnPreview({ id: columnId, order, title, tasks }: TColumn) {
  const { pathname } = useLocation();
  const urlToColumn = pathname + '/columns/' + columnId;
  const [isModalActive, setModal] = useState(false);

  function setIsModalActive(bool: boolean) {
    setModal(bool);
  }

  function createTaskHandler(value: typeof schema) {
    //TODO ADD API REQuest
    console.log('create task', value);
  }

  return (
    <div className="column-preview">
      <Link to={urlToColumn} className="column-preview_link">
        <div className="column-preview_title">{title}</div>
        {tasks &&
          tasks.map((task) => {
            return <TaskPreview key={task.id} {...task} />;
          })}
      </Link>
      <ButtonWithModalForm
        submitBtnName="add task"
        modalState={{ isModalActive, setIsModalActive }}
        buttonOptions={{
          btnClass: 'task_create__btn',
          type: 'button',
          text: 'Add task',
        }}
        formOptions={{
          ...formOptions,
          onSubmit: createTaskHandler,
          buttonOptions: { type: 'button' },
        }}
      />
    </div>
  );
}

export default ColumnPreview;
