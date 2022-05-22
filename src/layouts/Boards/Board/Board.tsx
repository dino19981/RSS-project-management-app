import React, { useState } from 'react';
import * as yup from 'yup';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { TColumn } from '../../../models/column';
import ColumnPreview from '../../Column/Column';
import ButtonWithModalForm from '../../../components/buttonWithModalForm/ButtonWithModalForm';
import { fieldsType } from '../../../models/form';
import { TColumnCreateSchema } from '../../../models/schemas';
import { useAxios } from '../../../hooks/useAxios';
import { TBoard } from '../../../models/board';
import Loader from '../../../components/loader/loader';
import { MAX_COLUMN_COUNT } from '../const';
import { Methods } from '../../../const/APIMethoods';
import { AppRoute } from '../../../const/routes';
import EmptyColumn from '../../Column/EmptyColumn';
import Column from '../../Column/Column';

const schema: TColumnCreateSchema = yup
  .object()
  .shape({
    title: yup.string().trim().required(),
  })
  .required();

const initialValues = {
  title: '',
};

const fields = [{ name: 'title', errorMessage: 'Title is required', placeholder: 'Board Title' }];

const formOptions = {
  schema,
  initialValues,
  fields,
};

function generateColumns(columns: TColumn[]) {
  const makeColumnOrder = columns?.sort((a, b) => a.order - b.order);

  return [...Array(MAX_COLUMN_COUNT)].map((_, index) => {
    const comparedColumn = makeColumnOrder[index];
    if (comparedColumn) {
      return <Column key={comparedColumn.id} {...comparedColumn} />;
    }
    return <EmptyColumn key={index} order={index} />;
  });
}

function Board() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [isModalActive, setIsModalActive] = useState(false);

  const { data, isLoading, isError, request } = useAxios({
    url: `${AppRoute.BOARDS}/${boardId}`,
    method: 'get',
  });

  const board = data as TBoard;

  async function deleteBoardHandler(id: string | undefined) {
    if (id) {
      await request({
        url: `${AppRoute.BOARDS}/${id}`,
        method: Methods.DELETE,
      });
      navigate(AppRoute.BOARDS);
    }
  }

  async function createColumnHandler(values: fieldsType) {
    const order = board?.columns.length > 0 ? board.columns.length + 1 : 1;

    if (order <= MAX_COLUMN_COUNT) {
      const body = { ...values, order } as { title: string; order: number };
      const columnsRequestOptions = {
        url: `${AppRoute.BOARDS}/${boardId}/columns`,
        method: Methods.POST,
        data: body,
      };
      await request(columnsRequestOptions);
      request();
    }

    setIsModalActive(false);
  }

  if (isError) {
    return <p>Не удалось загрузить колонки</p>;
  }

  if (isLoading) {
    return <Loader />;
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
      <div className="columns_wrapper">{generateColumns(board.columns)}</div>
      <Outlet />
    </div>
  );
}

export default Board;
