import { memo } from 'react';
import { Link } from 'react-router-dom';
import { boardPreviewProps } from 'models/boardPreview';
import Loader from 'components/loader/loader';
import { boardURL } from 'const/requestUrls';
import { useTranslation } from 'react-i18next';
import { useDeleteBoard } from 'shared/api/requests/board';
import { ActionButtonWithIcon } from 'components/ActionButtonWithIcon/ActionButtonWithIcon';

function BoardPreview({ id, title, description, updateBoards }: boardPreviewProps) {
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
          <h2 className="board-preview__title">{title}</h2>
          <p className="board-preview__description">{description}</p>
        </Link>
        <div className="board-preview__delete-wrapper">
          <ActionButtonWithIcon
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

export default memo(BoardPreview);
