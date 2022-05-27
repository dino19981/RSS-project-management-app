import { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonWithModalForm from '../../../components/buttonWithModalForm/ButtonWithModalForm';
import { boardPreviewProps } from '../../../models/boardPreview';
import { useAxios } from '../../../hooks/useAxios';
import Loader from '../../../components/loader/loader';
import { deleteBoardfields } from '../../../components/form/constants/fieldsOptions';
import { deleteBoardSchema } from '../../../schemas/boards';
import { Methods } from '../../../const/APIMethoods';
import { AppRoute } from '../../../const/routes';
import { ErrorMessage } from '../../../const/errorMesages';

const formOptions = {
  schema: deleteBoardSchema,
  fields: deleteBoardfields,
};

function BoardPreview({ id, title, description, updateBoards }: boardPreviewProps) {
  const { isLoading, isError, request } = useAxios({}, { dontFetchAtMount: true });
  const [isModalActive, setIsModalActive] = useState(false);

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

  return (
    <article className="board-preview">
      <Link to={`${AppRoute.BOARDS}/${id}`} className="board-preview__link">
        <h2 className="board-preview__title">{title}</h2>
      </Link>
      <p className="board-preview__description">{description}</p>
      <ButtonWithModalForm
        modalState={{ isModalActive, setIsModalActive }}
        buttonOptions={{ btnClass: 'board-preview__delete-btn', text: 'Удалить' }}
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
