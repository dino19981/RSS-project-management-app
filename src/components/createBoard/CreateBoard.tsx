import { useState } from 'react';
import { useAxios } from '../../hooks/useAxios';
import ButtonWithModalForm from '../buttonWithModalForm/ButtonWithModalForm';
import { AppRoute } from '../../const/routes';
import { newBoardSchema } from '../../schemas/newBoard';
import { newBoardValues } from '../../components/form/constants/initialValues';
import { newBoardFields } from '../../components/form/constants/fieldsOptions';
import { Methods } from '../../const/APIMethoods';
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/loader';
import { ErrorMessage } from '../../const/errorMessage';
import { useTranslation } from 'react-i18next';

const formOptions = {
  schema: newBoardSchema,
  initialValues: newBoardValues,
  fields: newBoardFields,
};

const icon = (
  <svg className="btn-new-board__icon" width="24" height="24">
    <use xlinkHref="#create-icon" />
  </svg>
);

export default function CreateBoard() {
  const { t } = useTranslation();
  const [isModalActive, setIsModalActive] = useState(false);
  const navigate = useNavigate();
  const { isLoading, isError, request } = useAxios({}, { dontFetchAtMount: true });

  async function createBoardHandler(values: typeof newBoardSchema) {
    const requestOptions = {
      url: AppRoute.BOARDS,
      method: Methods.POST,
      data: values,
    };
    const data = await request(requestOptions);
    if (data) {
      const {
        data: { id },
      } = data;
      console.log(id);

      setIsModalActive(false);
      navigate(`${AppRoute.BOARDS}/${id}`);
    }
  }

  return (
    <ButtonWithModalForm
      submitBtnName={t('buttons.create_board')}
      modalState={{ isModalActive, setIsModalActive }}
      buttonOptions={{
        btnClass: 'btn-new-board',
        text: t('header.create_new_board'),
        icon,
        isDisabled: isLoading,
      }}
      formOptions={{
        ...formOptions,
        onSubmit: createBoardHandler,
      }}
      isError={isError}
      errorText={ErrorMessage.SERVER_ERROR}
    />
  );
}
