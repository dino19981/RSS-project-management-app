import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TColumn } from '../../../models/column';
import ButtonWithModalForm from '../../../components/buttonWithModalForm/ButtonWithModalForm';
import { boardPreviewProps } from '../../../models/boardPreview';
import { useAxios } from '../../../hooks/useAxios';
import Loader from '../../../components/loader/loader';
import { Methods } from '../../../const/APIMethoods';
import { ErrorMessage } from '../../../const/errorMesages';
import { boardURL } from '../../../const/requestUrls';
import { useTranslation } from 'react-i18next';

function calculateTask(columns: TColumn[] | undefined) {
  if (columns === undefined) return null;
  let tasks = 0;
  columns.map((col) => {
    if (col.tasks) {
      tasks += col.tasks.length;
    }
  });
  return tasks;
}

function BoardPreview({ id, title, columns, updateBoards }: boardPreviewProps) {
  const { t } = useTranslation();
  const { isLoading, isError, request } = useAxios({}, { dontFetchAtMount: true });
  const [isModalActive, setIsModalActive] = useState(false);

  const taskCount = calculateTask(columns);

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
    <div className="board_preview">
      <Link to={boardURL(id)} className="board_preview__link">
        <div className="board_preview_title">{title}</div>
        {taskCount && <div className="board_preview__task-count">Total tasks: {taskCount}</div>}
      </Link>
      <div className="board_preview_footer">
        <ButtonWithModalForm
          modalState={{ isModalActive, setIsModalActive }}
          modalOptions={{ submitHandler: deleteBoard, contentWrapperClassName: 'modal__delete' }}
          buttonOptions={{ text: 'delete' }}
          submitBtnName={t('buttons.delete')}
          questionText={`${t('board.delete_board_message')} ${title}?`}
          isError={isError}
          errorText={ErrorMessage.SERVER_ERROR}
        />
      </div>
      {isLoading && <Loader />}
    </div>
  );
}

export default BoardPreview;
