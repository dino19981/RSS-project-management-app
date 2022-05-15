import React, { useState } from 'react';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { TBoard } from '../../../models/board';
import { TColumn } from '../../../models/column';
import ButtonWithModalForm from '../../../components/buttonWithModalForm/ButtonWithModalForm';
import { boardPreviewProps } from '../../../models/boardPreview';
import { useAxios } from '../../../hooks/useAxios';
import Loader from '../../../components/loader/loader';

function calculateTask(columns: TColumn[] | undefined) {
  if (columns === undefined) return null;
  let tasks = 0;
  columns.map((col) => {
    if (col.tasks) {
      tasks += col.tasks.length;
    }
  });
  return tasks;
}

const schema = yup
  .object()
  .shape({
    confirm: yup.boolean().required(),
  })
  .required();

const initialValues = {
  confirm: true,
};

const fields = [
  //TODO разобраться с полями
  { name: 'confirm', type: 'checkbox', inputClass: 'hidden', labelText: 'are you sure ?' },
];

const formOptions = {
  schema,
  initialValues,
  fields,
};

function BoardPreview({ id, title, columns, refreshBoards }: boardPreviewProps) {
  const { isLoading, isError, request } = useAxios({}, { dontFetchAtMount: true });
  const [isModalActive, setIsModalActive] = useState(false);

  const taskCount = calculateTask(columns);

  async function deleteBoard() {
    const deleteOptions = {
      url: `/boards/${id}`,
      method: 'delete',
    };
    await request(deleteOptions);
    setIsModalActive(false);
    refreshBoards();
  }

  return (
    <div className="board_preview">
      <Link to={`/boards/${id}`} className="board_preview__link">
        <div className="board_preview_title">{title}</div>
        {taskCount && <div className="board_preview__task-count">Total tasks: {taskCount}</div>}
      </Link>
      <div className="board_preview_footer">
        <ButtonWithModalForm
          modalState={{ isModalActive, setIsModalActive }}
          buttonOptions={{ text: 'delete' }}
          submitBtnName="OK"
          formOptions={{
            ...formOptions,
            onSubmit: deleteBoard,
            buttonOptions: {},
          }}
        />
      </div>
      {isLoading && <Loader />}
    </div>
  );
}

export default BoardPreview;
