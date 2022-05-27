import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { TColumn } from '../../../models/column';
import ButtonWithModalForm from '../../../components/buttonWithModalForm/ButtonWithModalForm';
import { fieldsType } from '../../../models/form';
import { useAxios } from '../../../hooks/useAxios';
import { TBoard } from '../../../models/board';
import Loader from '../../../components/loader/loader';
import { MAX_COLUMN_COUNT } from '../const';
import { Methods } from '../../../const/APIMethoods';
import { AppRoute } from '../../../const/routes';
import EmptyColumn from '../../Column/EmptyColumn';
import { columSchema } from '../../../schemas/column';
import { columnValues } from '../../../components/form/constants/initialValues';
import { columnfields } from '../../../components/form/constants/fieldsOptions';
import Column from '../../Column/Column';
import { boardURL, columnsURL } from '../../../const/requestUrls';

const formOptions = {
  schema: columSchema,
  initialValues: columnValues,
  fields: columnfields,
};

function generateColumns(columns: TColumn[], updateHandler: () => Promise<void>) {
  const makeColumnOrder = columns?.sort((a, b) => a.order - b.order);

  return [...Array(MAX_COLUMN_COUNT)].map((_, index) => {
    const comparedColumn = makeColumnOrder[index];
    if (comparedColumn) {
      return <Column key={comparedColumn.id} {...comparedColumn} updateHandler={updateHandler} />;
    }
    return <EmptyColumn key={index} />;
  });
}

function Board() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [isModalActive, setIsModalActive] = useState(false);

  const { data, isLoading, isError, request } = useAxios({
    url: boardURL(boardId),
    method: 'get',
  });

  const board = data as TBoard;

  useEffect(() => {
    if (data) {
      request();
    }
  }, [boardId]);

  async function deleteBoardHandler(id: string | undefined) {
    if (id) {
      await request({
        url: boardURL(id),
        method: Methods.DELETE,
      });
      navigate(AppRoute.MAIN);
    }
  }

  async function createColumnHandler(values: fieldsType) {
    const body = { ...values };
    const columnsRequestOptions = {
      url: columnsURL(boardId),
      method: Methods.POST,
      data: body,
    };
    await request(columnsRequestOptions);
    request();
    setIsModalActive(false);
  }

  async function putRequest() {
    await request();
  }

  if (isError) {
    return <p className="board__error">Не удалось загрузить колонки</p>;
  }

  return (
    <section className="board">
      <h1 className="board__title">{board && board.title}</h1>
      <div className="board__menu">
        <ButtonWithModalForm
          submitBtnName="Создать колонку"
          modalState={{ isModalActive, setIsModalActive }}
          buttonOptions={{
            btnClass: 'column_create__btn',
            text: 'Создать колонку',
          }}
          formOptions={{
            ...formOptions,
            onSubmit: createColumnHandler,
          }}
        />
        <button type="button" onClick={() => deleteBoardHandler(boardId)}>
          Удалить доску
        </button>
      </div>
      {board && <div className="columns-wrapper">{generateColumns(board.columns, putRequest)}</div>}
      {isLoading && <Loader />}
      <Outlet />
    </section>
  );
}

export default Board;
