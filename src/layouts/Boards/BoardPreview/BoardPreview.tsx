import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TColumn } from '../../../models/column';
import ButtonWithModalForm from '../../../components/buttonWithModalForm/ButtonWithModalForm';
import { boardPreviewProps } from '../../../models/boardPreview';
import { useAxios } from '../../../hooks/useAxios';
import Loader from '../../../components/loader/loader';
import { deleteBoardfields } from '../../../components/form/constants/fieldsOptions';
import { deleteBoardSchema } from '../../../schemas/boards';
import { Methods } from '../../../const/APIMethoods';
import { AppRoute } from '../../../const/routes';
import { ErrorMessage } from '../../../const/errorMesages';

function calculateTask(columns: TColumn[] | undefined) {
  if (columns === undefined) return null;
  let tasks = 0;
  console.log('columns:');
  columns.map((col) => {
    if (col.tasks) {
      tasks += col.tasks.length;
    }
  });
  return tasks;
}

const formOptions = {
  schema: deleteBoardSchema,
  fields: deleteBoardfields,
};

function BoardPreview({ id, title, columns, description, updateBoards }: boardPreviewProps) {
  const { isLoading, isError, request } = useAxios({}, { dontFetchAtMount: true });
  const [isModalActive, setIsModalActive] = useState(false);

  const taskCount = calculateTask(columns);

  async function deleteBoard() {
    const deleteOptions = {
      url: `${AppRoute.BOARDS}/${id}`,
      method: Methods.DELETE,
    };
    const deleteData = await request(deleteOptions);

    if (deleteData) {
      setIsModalActive(false);
      updateBoards();
    }
  }

  const initialValues = {
    title,
  };

  console.log('taskcount:', taskCount);

  return (
    <article className="board-preview">
      <Link to={`${AppRoute.BOARDS}/${id}`} className="board-preview__link">
        <h2 className="board-preview__title">{title}</h2>
        {taskCount && <div className="board-preview__task-count">Total tasks: {taskCount}</div>}
      </Link>
      <p className="board-preview__description">{description}</p>
      <ButtonWithModalForm
        modalState={{ isModalActive, setIsModalActive }}
        buttonOptions={{ text: 'delete' }}
        submitBtnName="OK"
        formOptions={{
          ...formOptions,
          initialValues,
          onSubmit: deleteBoard,
        }}
        isError={isError}
        errorText={ErrorMessage.SERVER_ERROR}
      />
      {isLoading && <Loader />}
    </article>
  );
}

export default BoardPreview;
