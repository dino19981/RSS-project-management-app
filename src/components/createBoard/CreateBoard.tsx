import { useState } from 'react';
import { useAxios } from '../../hooks/useAxios';
import ButtonWithModalForm from '../buttonWithModalForm/ButtonWithModalForm';
import { AppRoute } from '../../const/routes';
import { newBoardSchema } from '../../schemas/newBoard';
import { newBoardValues } from '../../components/form/constants/initialValues';
import { newBoardFields } from '../../components/form/constants/fieldsOptions';
import { Methods } from '../../const/APIMethod';
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/loader';
import { ErrorMessage } from '../../const/errorMessage';
import { useTranslation } from 'react-i18next';
import { newBoardIcon } from '../icons/Icons';

const formOptions = {
  schema: newBoardSchema,
  initialValues: newBoardValues,
  fields: newBoardFields,
};

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
        icon: newBoardIcon,
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
