import { useState } from 'react';
import ButtonWithModalForm from '../../../components/buttonWithModalForm/ButtonWithModalForm';
import { AppRoute } from '../../../const/routes';
import { newBoardSchema } from '../../../schemas/newBoard';
import { newBoardValues } from '../../../components/form/constants/initialValues';
import { newBoardFields } from '../../../components/form/constants/fieldsOptions';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newBoardIcon } from '../../../components/icons/Icons';
import { useCreateBoard } from 'api/requests/board';

const formOptions = {
  schema: newBoardSchema,
  initialValues: newBoardValues,
  fields: newBoardFields,
};

export default function CreateBoard() {
  const { t } = useTranslation();
  const [isModalActive, setIsModalActive] = useState(false);
  const navigate = useNavigate();
  const { isLoading, error, request } = useCreateBoard();

  async function createBoardHandler(values: typeof newBoardSchema) {
    const data = await request({ data: values });

    if (data) {
      setIsModalActive(false);
      navigate(`${AppRoute.BOARDS}/${data.data.id}`);
    }
  }

  return (
    <ButtonWithModalForm
      modalOptions={{ submitBtnName: t('buttons.create_board'), error }}
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
    />
  );
}
