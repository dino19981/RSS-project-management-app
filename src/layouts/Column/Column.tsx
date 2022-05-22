import React, { useState } from 'react';
import ButtonWithModalForm from '../../components/buttonWithModalForm/ButtonWithModalForm';
import { columnfields } from '../../components/form/constants/fieldsOptions';
import { columnValues } from '../../components/form/constants/initialValues';
import { TColumn } from '../../models/column';
import { columSchema } from '../../schemas/column';

const formOptions = {
  schema: columSchema,
  initialValues: columnValues,
  fields: columnfields,
};

function Column({ title }: TColumn) {
  const [isModalActive, setIsModalActive] = useState(false);

  function editColumnHandler(value: typeof columSchema) {
    //TODO ADD API REQuest
    console.log('edit column', value);
  }

  return (
    <div className="columns_wrapper">
      <div className="column">
        {
          <div className="column_title">
            {title}
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
        }
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
