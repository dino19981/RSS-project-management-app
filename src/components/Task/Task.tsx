import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import ButtonWithModalForm from '../buttonWithModalForm/ButtonWithModalForm';

const schema = yup
  .object()
  .shape({
    title: yup.string().trim().required(),
    description: yup.string().trim().required(),
  })
  .required();

const fields = [
  //TODO разобраться с полями
  { name: 'title', errorMessage: 'Title is required', placeholder: 'task title' },
  { name: 'description', errorMessage: 'description is required', placeholder: 'description' },
];

function Task() {
  const [isModalActive, setIsModalActive] = useState(true);
  const initialValues = {
    title: '',
    description: '',
  };
  useEffect(() => {
    // TODO  FETCH GET /boards/:boardId/columns/:columnId/tasks/:taskId
    // initialValuess = response
  }, []);

  const formOptions = {
    schema,
    initialValues,
    fields,
  };

  function saveTask() {
    // TODO  FETCH PUT /boards/:boardId/columns/:columnId/tasks/:taskId
    console.log('save task');
  }

  return (
    <div className="task">
      <ButtonWithModalForm
        modalState={{ isModalActive, setIsModalActive }}
        buttonOptions={{ btnClass: 'hidden' }}
        submitBtnName="save task"
        formOptions={{
          ...formOptions,
          onSubmit: saveTask,
          buttonOptions: {},
        }}
      />
    </div>
  );
}

export default Task;
