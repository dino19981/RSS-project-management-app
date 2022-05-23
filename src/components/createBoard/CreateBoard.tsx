import { useState } from 'react';
import { useAxios } from '../../hooks/useAxios';
import ButtonWithModalForm from '../buttonWithModalForm/ButtonWithModalForm';
import { AppRoute } from '../../const/routes';
import { newBoardSchema } from '../../schemas/newBoard';
import { newBoardValues } from '../../components/form/constants/initialValues';
import { newBoardFields } from '../../components/form/constants/fieldsOptions';

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
  // const { request } = useAxios({
  //   url: `${AppRoute.BOARDS}/${boardId}`,
  //   method: Methods.GET,
  // });

  async function createBoardHandler(value: typeof newBoardSchema) {
    // const body = { ...value, order: tasks.length + 1, userId };
    // await request({
    //   url: `${AppRoute.BOARDS}/${boardId}${AppRoute.COLUMNS}/${columnId}${AppRoute.TASKS}`,
    //   method: Methods.POST,
    //   data: body,
    // });
    // setIsModalActive(false);
  }

  return (
    <ButtonWithModalForm
      submitBtnName="add task"
      modalState={{ isModalActive, setIsModalActive }}
      buttonOptions={{
        btnClass: 'btn-new-board',
        text: 'Создать новую доску',
        icon,
      }}
      formOptions={{
        ...formOptions,
        onSubmit: createBoardHandler,
        buttonOptions: {},
      }}
    />
  );
}
