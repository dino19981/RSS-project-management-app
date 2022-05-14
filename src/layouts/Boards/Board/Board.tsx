import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import { TColumn } from '../../../models/column';
import ColumnPreview from '../../Columns/ColumnPreview';
import ButtonWithModalForm from '../../../components/buttonWithModalForm/ButtonWithModalForm';
import { useDrop } from 'react-dnd';
import EmptyColumn from '../../Columns/EmptyColumn';

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
          description: 'wrwerwerwerweroked gently',
          userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
          files: [
            {
              filename: 'foto.jpg',
              fileSize: 6105000,
            },
          ],
        },
        {
          id: '6e3abe9c-ceb1-40fa-9a04-eb2b12312312184daf9',
          title: 'Task: pet the cat',
          order: 2,
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
          id: '6e3abe9c-ceb1-40fa-9a04-eb2b21841239',
          title: 'Ta123123123t',
          order: 3,
          done: false,
          description: 'Domwerwerwerwerstroked gently',
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

  const [isModalActive, setIsModalActive] = useState(false);

  const { boardId } = useParams();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'column',
    drop: (item: HTMLDivElement) => changeOrderHandler(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  async function deleteBoardHandler(id: string | undefined) {
    //TODO ADD API REQuest
    console.log('delete board', id);
  }

  function createColumnHandler(value: typeof schema) {
    //TODO ADD API REQuest
    console.log('create column', value);
  }

  function changeOrderHandler(item: HTMLDivElement) {
    console.log('change order', item);
  }

  function generateColumns(columnCount: number, columns: TColumn[]) {
    return [...Array(columnCount)].map((el, index) => {
      const comparedColumn = columns.find((c) => c.order === index + 1);
      if (comparedColumn) {
        return <ColumnPreview key={comparedColumn?.id || index} {...comparedColumn} />;
      }
      return <EmptyColumn key={index} order={index} />;
    });
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
              text: 'Add column',
            }}
            formOptions={{
              ...formOptions,
              onSubmit: createColumnHandler,
              buttonOptions: {},
            }}
          />
          <button type="button" onClick={() => deleteBoardHandler(boardId)}>
            delete board
          </button>
        </>
      </div>
      <div className="columns_wrapper" ref={drop}>
        {
          // columns &&
          // columns.map((col) => {
          //   return <ColumnPreview key={col.id} {...col} />;
          // })
          generateColumns(5, columns)
        }
      </div>
    </div>
  );
}

export default Board;
