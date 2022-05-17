import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import ButtonWithModalForm from '../../components/buttonWithModalForm/ButtonWithModalForm';
import { TColumn } from '../../models/column';
import TaskPreview from '../Task/TaskPreview';

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

/*
смена порядка
1 определить order=X элемента куда ставить 
2 Если order текущего элемента Y  больше чем order заменяемого элемента Х
- начиная с конца изменить ордер всех элементов на +1 по X включительно
- изменить Order Y на Х
3 Если order текущего элемента Y  меньше чем order заменяемого элемента Х
- изменить X на последний (columns.length) +1 
- изменить Y  на х
- изменить X на Y-1


*/

function Column() {
  const column: TColumn = {
    id: '123123',
    order: 1,
    title: 'qwe',
    tasks: [],
  };

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
                text: 'edit column',
              }}
              formOptions={{
                ...formOptions,
                onSubmit: editColumnHandler,
                buttonOptions: {},
              }}
            />
          </div>
        )}
        {/* 
        {tasks &&
          tasks.map((task) => {
            return <TaskPreview key={task.id} {...task} />;
          })} */}
      </div>
    </div>
  );
}

export default Column;
