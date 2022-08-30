import { useEffect, useMemo, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { TColumn } from '../../../models/column';
import { fieldsType } from '../../../models/form';
import { TBoard } from '../../../models/board';
import Loader from '../../../components/loader/loader';
import { MAX_COLUMN_COUNT } from '../boards/const';
import { AppRoute } from '../../../const/routes';
import { columSchema } from '../../../schemas/column';
import { columnValues } from '../../../components/form/constants/initialValues';
import { columnfields } from '../../../components/form/constants/fieldsOptions';
import Column from '../../column/Column';
import { TFunction, useTranslation } from 'react-i18next';
import { ErrorMessage } from '../../../const/errorMessage';
import { plusIcon, deleteIcon } from '../../../components/icons/Icons';
import { connect } from 'react-redux';
import { createColumn, deleteBoard, getBoardData } from '../../../store/board/actions';
import { RootState } from '../../../store/store';

const formOptions = {
  schema: columSchema,
  initialValues: columnValues,
  fields: columnfields,
};

function displayColumns(columns: TColumn[], t: TFunction<'translation', undefined>) {
  if (!columns.length) return <p className="board__add-column">{t('board.add_column_message')}</p>;

  return columns.map((column) => <Column key={column.id} {...column} />);
}

type Props = {
  getBoardData: (arg: string) => void;
  deleteBoard: (arg: string) => void;
  createColumn: ({ boardId, values }: { boardId: string; values: fieldsType }) => void;
  board: TBoard;
  fetchError: string;
  fetchLoading: boolean;
  requestError: string;
  requestLoading: boolean;
};

function Board({
  getBoardData,
  deleteBoard,
  createColumn,
  board,
  fetchError,
  fetchLoading,
  requestError,
  requestLoading,
}: Props) {
  const { t } = useTranslation();
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [maxColumnCountError, setMaxColumnCountError] = useState(false);
  const [isCreateColumnModalActive, setCreateColumnIsModalActive] = useState(false);
  const [isDeleteBoardModalActive, setDeleteBoardIsModalActive] = useState(false);
  console.log(board.columns);

  useEffect(() => {
    if (boardId) {
      getBoardData(boardId);
    }
  }, []);

  async function createColumnHandler(values: fieldsType) {
    if (board.columns.length === MAX_COLUMN_COUNT) {
      setMaxColumnCountError(true);
      return;
    }
    await createColumn({ boardId: board.id, values });
    setCreateColumnIsModalActive(false);
  }

  async function deleteBoardHandler() {
    await deleteBoard(board.id);

    navigate(AppRoute.MAIN);
  }

  const deleteBoardOptions = useMemo(
    () => ({
      modalState: {
        isModalActive: isDeleteBoardModalActive,
        setIsModalActive: setDeleteBoardIsModalActive,
      },
      modalOptions: {
        submitHandler: deleteBoardHandler,
        contentWrapperClassName: 'modal__delete',
        submitBtnName: t('buttons.delete'),
        // isError: isError,
        errorText: ErrorMessage.SERVER_ERROR,
      },
      buttonOptions: {
        btnClass: 'board__delete-column-btn',
        text: t('buttons.delete_board'),
        icon: deleteIcon,
      },

      questionText: `${t('board.delete_board_message')} ${board?.title}?`,
    }),
    [isDeleteBoardModalActive]
  );

  const createColumnOptions = useMemo(
    () => ({
      modalState: {
        isModalActive: isCreateColumnModalActive,
        setIsModalActive: setCreateColumnIsModalActive,
      },
      modalOptions: {
        contentWrapperClassName: 'board__create-column',
        submitBtnName: t('buttons.create_column'),
      },
      buttonOptions: {
        btnClass: 'board__create-column-btn',
        text: t('buttons.create_column'),
        icon: plusIcon,
      },
      formOptions: { ...formOptions, onSubmit: createColumnHandler },
      isError: maxColumnCountError,
      errorText: t('error_messages.max_columns_count'),
    }),
    [isCreateColumnModalActive]
  );

  if (fetchLoading) {
    return <Loader />;
  }

  if (fetchError) {
    return <p className="board__error">Не удалось загрузить колонки</p>;
  }

  return (
    <section className="board">
      <div className="board__menu">
        <h1 className="board__title">{board && board.title}</h1>
        <div className="board__btn-wrapper">
          <Link className="board__back-home" to={AppRoute.MAIN}>
            ↩{t('buttons.to_main_page')}
          </Link>
        </div>
      </div>
      <div className="columns-wrapper">{displayColumns(board.columns, t)}</div>
      {requestLoading && <Loader />}
      <Outlet />
    </section>
  );
}

const mapStateToProps = function (state: RootState) {
  return {
    board: state.board.board,
    fetchError: state.board.fetchError,
    fetchLoading: state.board.fetchLoading,
    requestError: state.board.requestError,
    requestLoading: state.board.requestLoading,
  };
};

const mapDispatchToProps = {
  getBoardData,
  deleteBoard,
  createColumn,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
