import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import { TColumn } from '../../../models/column';
import ButtonWithModalForm from '../../buttonWithModalForm/ButtonWithModalForm';
import ColumnPreview from '../../Columns/ColumnPreview';

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
  { name: 'title', errorMessage: 'Title is required', placeholder: 'Board Title' },
];

const formOptions = {
  schema,
  initialValues,
  fields,
};

function Board() {
  useEffect(() => {
    //TODO Загрузка  доски /board:id
  }, []);

  const columns: TColumn[] | undefined = [
    {
      id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f',
      title: 'Done',
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
    },
  ];

  const [isModalActive, setModal] = useState(false);

  function setIsModalActive(bool: boolean) {
    setModal(bool);
  }

  const { boardId } = useParams();

  async function deleteBoardHandler(id: string | undefined) {
    //TODO ADD API REQuest
    console.log('delete board', id);
  }

  function createColumnHandler(value: typeof schema) {
    //TODO ADD API REQuest
    console.log('create column', value);
  }

  return (
    <div className="board">
      <div className="board_menu">
        <>
          <ButtonWithModalForm
            submitBtnName="Create column"
            modalState={{ isModalActive, setIsModalActive }}
            buttonOptions={{
              btnClass: 'column_create__btn',
              type: 'button',
              text: 'Add column',
            }}
            formOptions={{
              ...formOptions,
              onSubmit: createColumnHandler,
              buttonOptions: { type: 'button' },
            }}
          />
          <button type="button" onClick={() => deleteBoardHandler(boardId)}>
            delete board
          </button>
        </>
      </div>
      <div className="columns_wrapper">
        {columns &&
          columns.map((col) => {
            return <ColumnPreview key={col.id} {...col} />;
          })}
      </div>
    </div>
  );
}

export default Board;
