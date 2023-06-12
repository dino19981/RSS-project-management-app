import Loader from 'components/loader/loader';
import { boardURL } from 'const/requestUrls';
import { BoardInfo } from 'entities/board';
import { UseAxiosReturn } from 'hooks/useAxios';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Board, useDeleteBoard } from 'shared/api/requests/board';
import { DeleteButtonWithModal } from 'shared/ui/ButtonsWithModal/DeleteButtonWithModal/DeleteButtonWithModal';

type Props = Board & {
  updateBoards: UseAxiosReturn<Board[]>['request'];
};

export function BoardPreview({ id, title, description, updateBoards }: Props) {
  const { t } = useTranslation();
  const { isLoading, error, request } = useDeleteBoard(id);

  async function deleteBoard() {
    await request();
    updateBoards();
  }

  return (
    <li className="boards__item">
      <article className="board-preview">
        <Link to={boardURL(id)} className="board-preview__link">
          <BoardInfo title={title} description={description} />
        </Link>
        <div className="board-preview__delete-wrapper">
          <DeleteButtonWithModal
            onSubmit={deleteBoard}
            error={error}
            text={`${t('board.delete_board_message')} ${title}?`}
          />
        </div>
        {isLoading && <Loader />}
      </article>
    </li>
  );
}
