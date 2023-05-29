import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import ButtonWithModalForm from 'components/buttonWithModalForm/ButtonWithModalForm';
import { boardPreviewProps } from 'models/boardPreview';
import Loader from 'components/loader/loader';
import { ErrorMessage } from 'const/errorMessage';
import { boardURL } from 'const/requestUrls';
import { useTranslation } from 'react-i18next';
import { deleteIcon } from 'components/icons/Icons';
import { useDeleteBoard } from 'api/requests/board';

function BoardPreview({ id, title, description, updateBoards }: boardPreviewProps) {
  const { t } = useTranslation();
  const { isLoading, isError, request } = useDeleteBoard(id);
  const [isModalActive, setIsModalActive] = useState(false);

  async function deleteBoard() {
    const deleteData = await request();

    if (deleteData) {
      setIsModalActive(false);
      updateBoards();
    }
  }

  return (
    <article className="board-preview">
      <Link to={boardURL(id)} className="board-preview__link">
        <h2 className="board-preview__title">{title}</h2>
        <p className="board-preview__description">{description}</p>
      </Link>
      <div className="board-preview__delete-wrapper">
        <ButtonWithModalForm
          modalState={{ isModalActive, setIsModalActive }}
          modalOptions={{
            submitHandler: deleteBoard,
            contentWrapperClassName: 'modal__delete',
            submitBtnName: t('buttons.delete'),
            isError,
            errorText: ErrorMessage.SERVER_ERROR,
          }}
          buttonOptions={{
            text: 'delete',
            icon: deleteIcon,
            isVisuallyHiddenText: true,
            btnClass: 'board-preview__delete-btn',
          }}
          questionText={`${t('board.delete_board_message')} ${title}?`}
        />
      </div>
      {isLoading && <Loader />}
    </article>
  );
}

export default memo(BoardPreview);
