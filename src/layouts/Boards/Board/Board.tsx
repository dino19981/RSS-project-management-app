import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { TColumn } from '../../../models/column';
import ButtonWithModalForm from '../../../components/buttonWithModalForm/ButtonWithModalForm';
import { fieldsType } from '../../../models/form';
import { useAxios } from '../../../hooks/useAxios';
import { TBoard } from '../../../models/board';
import Loader from '../../../components/loader/loader';
import { MAX_COLUMN_COUNT } from '../const';
import { Methods } from '../../../const/APIMethod';
import { AppRoute } from '../../../const/routes';
import { columSchema } from '../../../schemas/column';
import { columnValues } from '../../../components/form/constants/initialValues';
import { columnfields } from '../../../components/form/constants/fieldsOptions';
import Column from '../../Column/Column';
import { boardURL, columnsURL } from '../../../const/requestUrls';
import { TFunction, useTranslation } from 'react-i18next';
import { ErrorMessage } from '../../../const/errorMessage';
import { plusIcon, deleteIcon } from '../../../components/icons/Icons';

const formOptions = {
  schema: columSchema,
  initialValues: columnValues,
  fields: columnfields,
};

function generateColumns(
  columns: TColumn[],
  updateHandler: () => void,
  t: TFunction<'translation', undefined>
) {
  if (!columns.length) return <p className="board__add-column">{t('board.add_column_message')}</p>;
  const makeColumnOrder = columns?.sort((a, b) => a.order - b.order);

  return makeColumnOrder.map((column) => (
    <Column key={column.id} {...column} updateBoard={updateHandler} />
  ));
}

function Board() {
  const { t } = useTranslation();
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [maxColumnCountError, setMaxColumnCountError] = useState(false);
  const [isCreateColumnModalActive, setCreateColumnIsModalActive] = useState(false);
  const [isDeleteBoardModalActive, setDeleteBoardIsModalActive] = useState(false);

  const { data, isLoading, isError, request } = useAxios({
    url: boardURL(boardId),
    method: Methods.GET,
  });

  const board = data as TBoard;

  useEffect(() => {
    if (data) {
      request();
    }
  }, [boardId]);

  async function deleteBoardHandler() {
    const deleteBoard = await request({
      url: boardURL(board.id),
      method: Methods.DELETE,
    });

    if (deleteBoard) {
      navigate(AppRoute.MAIN);
    }
  }

  async function createColumnHandler(values: fieldsType) {
    if (board.columns.length === MAX_COLUMN_COUNT) {
      setMaxColumnCountError(true);
      return;
    }
    const body = { ...values };
    const columnsRequestOptions = {
      url: columnsURL(boardId),
      method: Methods.POST,
      data: body,
    };
    await request(columnsRequestOptions);
    request();
    setCreateColumnIsModalActive(false);
  }

  if (isError) {
    return <p className="board__error">Не удалось загрузить колонки</p>;
  }

  const createColumnOptions = {
    submitBtnName: t('buttons.create_column'),
    modalState: {
      isModalActive: isCreateColumnModalActive,
      setIsModalActive: setCreateColumnIsModalActive,
    },
    modalOptions: { contentWrapperClassName: 'board__create-column' },
    buttonOptions: {
      btnClass: 'board__create-column-btn',
      text: t('buttons.create_column'),
      icon: plusIcon,
    },
    formOptions: { ...formOptions, onSubmit: createColumnHandler },
    isError: maxColumnCountError,
    errorText: t('error_messages.max_columns_count'),
  };

  const deleteBoardOptions = {
    modalState: {
      isModalActive: isDeleteBoardModalActive,
      setIsModalActive: setDeleteBoardIsModalActive,
    },
    modalOptions: { submitHandler: deleteBoardHandler, contentWrapperClassName: 'modal__delete' },
    buttonOptions: {
      btnClass: 'board__delete-column-btn',
      text: t('buttons.delete_board'),
      icon: deleteIcon,
    },
    submitBtnName: t('buttons.delete'),
    questionText: `${t('board.delete_board_message')} ${board?.title}?`,
    isError: isError,
    errorText: ErrorMessage.SERVER_ERROR,
  };

  return (
    <section className="board">
      <div className="board__menu">
        <h1 className="board__title">{board && board.title}</h1>
        <div className="board__btn-wrapper">
          <Link className="board__back-home" to={AppRoute.MAIN}>
            ↩{t('buttons.to_main_page')}
          </Link>
          <ButtonWithModalForm {...createColumnOptions} />
          <ButtonWithModalForm {...deleteBoardOptions} />
        </div>
      </div>
      {board && <div className="columns-wrapper">{generateColumns(board.columns, request, t)}</div>}
      {isLoading && <Loader />}
      <Outlet context={{ updateBoard: request }} />
    </section>
  );
}

export default Board;
