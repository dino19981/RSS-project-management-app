import React, { useState } from 'react';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { TColumn } from '../../../models/column';
import ColumnPreview from '../../Columns/ColumnPreview';
import ButtonWithModalForm from '../../../components/buttonWithModalForm/ButtonWithModalForm';
import EmptyColumn from '../../Columns/EmptyColumn';
import { fieldsType } from '../../../models/form';
import { TColumnCreateSchema } from '../../../models/schemas';
import { useAxios } from '../../../hooks/useAxios';
import { TBoard } from '../../../models/board';
import Loader from '../../../components/loader/loader';

const schema: TColumnCreateSchema = yup
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

function generateColumns(
  columns: TColumn[] | undefined,
  columnCount = 5,
  updateHandler: () => void
) {
  return [...Array(columnCount)].map((el, index) => {
    const comparedColumn = columns?.find((c) => c.order === index + 1);
    if (comparedColumn) {
      return (
        <ColumnPreview
          key={comparedColumn?.id || index}
          {...comparedColumn}
          updateHandler={updateHandler}
        />
      );
    }
    return <EmptyColumn key={index} order={index} />;
  });
}

function Board() {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, request } = useAxios({
    url: `/boards/${boardId}`,
    method: 'get',
  });
  const board = data as TBoard;
  const nextOrder = board?.columns.length > 0 ? board.columns.length + 1 : 1;
  const [isModalActive, setIsModalActive] = useState(false);

  async function deleteBoardHandler(id: string | undefined) {
    if (id) {
      await request({
        url: `/boards/${id}`,
        method: 'delete',
      });
      navigate('/boards');
    }
  }

  async function createColumnHandler(boardId = '', values: fieldsType, order: number) {
    if (order <= 5) {
      const body = { ...values, order } as { title: string; order: number };
      const columnsRequestOptions = {
        url: `/boards/${boardId}/columns`,
        method: 'post',
        data: body,
      };
      await request(columnsRequestOptions);
      setIsModalActive(false);
      request();
    }
    setIsModalActive(false);
  }

  if (isError) return <p>Ошибка</p>;
  if (isLoading) return <Loader />;
  const { columns } = board as TBoard;
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
              onSubmit: (values) => {
                createColumnHandler(boardId, values, nextOrder);
              },
              buttonOptions: {},
            }}
          />
          <button type="button" onClick={() => deleteBoardHandler(boardId)}>
            delete board
          </button>
        </>
      </div>
      <div className="columns_wrapper">{generateColumns(columns, 5, request)}</div>
    </div>
  );
}

export default Board;
