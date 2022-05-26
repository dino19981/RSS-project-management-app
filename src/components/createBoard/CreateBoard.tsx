import { useState } from 'react';
import { useAxios } from '../../hooks/useAxios';
import ButtonWithModalForm from '../buttonWithModalForm/ButtonWithModalForm';
import { AppRoute } from '../../const/routes';
import { newBoardSchema } from '../../schemas/newBoard';
import { newBoardValues } from '../../components/form/constants/initialValues';
import { newBoardFields } from '../../components/form/constants/fieldsOptions';
import { Methods } from '../../const/APIMethoods';
import { useNavigate } from 'react-router-dom';

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
  const [isModalActive, setIsModalActive] = useState(false);
  const navigate = useNavigate();
  const { request } = useAxios({}, { dontFetchAtMount: true });

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
      submitBtnName="Создать доску"
      modalState={{ isModalActive, setIsModalActive }}
      buttonOptions={{
        btnClass: 'btn-new-board',
        text: 'Создать новую доску',
        icon,
      }}
      formOptions={{
        ...formOptions,
        onSubmit: createBoardHandler,
      }}
    />
  );
}
