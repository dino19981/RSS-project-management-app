import { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonWithModalForm from '../../../components/buttonWithModalForm/ButtonWithModalForm';
import { boardPreviewProps } from '../../../models/boardPreview';
import { useAxios } from '../../../hooks/useAxios';
import Loader from '../../../components/loader/loader';
import { Methods } from '../../../const/APIMethoods';
import { ErrorMessage } from '../../../const/errorMessage';
import { boardURL } from '../../../const/requestUrls';
import { useTranslation } from 'react-i18next';
import { deleteIcon } from '../../../components/icons/Icons';

function BoardPreview({ id, title, description, updateBoards }: boardPreviewProps) {
  const { t } = useTranslation();
  const { isLoading, isError, request } = useAxios({}, { dontFetchAtMount: true });
  const [isModalActive, setIsModalActive] = useState(false);

  async function deleteBoard() {
    const deleteOptions = {
      url: boardURL(id),
      method: Methods.DELETE,
    };
    const deleteData = await request(deleteOptions);

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
          modalOptions={{ submitHandler: deleteBoard, contentWrapperClassName: 'modal__delete' }}
          buttonOptions={{
            text: 'delete',
            icon: deleteIcon,
            isVisuallyHiddenText: true,
            btnClass: 'board-preview__delete-btn',
          }}
          submitBtnName={t('buttons.delete')}
          questionText={`${t('board.delete_board_message')} ${title}?`}
          isError={isError}
          errorText={ErrorMessage.SERVER_ERROR}
        />
      </div>
      {isLoading && <Loader />}
    </article>
  );
}

export default BoardPreview;
