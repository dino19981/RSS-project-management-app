import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TColumn } from '../../../models/column';
import ColumnPreview from '../../Column/ColumnPreview';
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
      return (
        <ColumnPreview
          key={comparedColumn.id || index}
          currentColumn={comparedColumn}
          updateHandler={updateHandler}
        />
      );
    }
    return <EmptyColumn key={index} />;
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
    const body = { ...values };
    const columnsRequestOptions = {
      url: `${AppRoute.BOARDS}/${boardId}${AppRoute.COLUMNS}`,
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
    return <p>Не удалось загрузить колонки</p>;
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
      {board && <div className="columns_wrapper">{generateColumns(board.columns, putRequest)}</div>}
      {isLoading && <Loader />}
    </div>
  );
}

export default Board;
