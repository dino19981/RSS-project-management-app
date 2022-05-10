import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import Form from '../form/Form';
import Modal from '../modal/Modal';

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
  const [isModalActive, setModal] = useState(true);
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

  function closeModal() {
    console.log('close modal');
    setModal(false);
  }

  function saveTask() {
    // TODO  FETCH PUT /boards/:boardId/columns/:columnId/tasks/:taskId
    console.log('save task');
  }

  return (
    <div className="task">
      <Modal formId="modalForm-task" handleCloseModal={closeModal} submitBtnName="save task">
        <Form
          formId="modalForm-task"
          {...formOptions}
          onSubmit={saveTask}
          buttonOptions={{ text: '123' }}
        />
      </Modal>
    </div>
  );
}

export default Task;
