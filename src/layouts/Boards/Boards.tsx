import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import ButtonWithModalForm from '../../components/buttonWithModalForm/ButtonWithModalForm';
import { selectBoards } from '../../store/global/action';
import { setBoards } from '../../store/global/actions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getBoards } from '../../utils/boards';
import BoardPreview from './BoardPreview/BoardPreview';

const schema = yup
  .object()
  .shape({
    title: yup.string().trim().required(),
  })
  .required();

const initialValues = {
  title: '',
};

const fields = [
  //TODO разобраться с полями
  { name: 'title', errorMessage: 'Title is required', placeholder: 'Board Title' },
];

const formOptions = {
  schema,
  initialValues,
  fields,
};

function Boards() {
  const { boards } = useAppSelector(selectBoards);
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      const boardsFromDB = await getBoards();
      dispatch(setBoards(boardsFromDB));
    })();
  }, []);

  function createBoardHandler(value: typeof schema) {
    //TODO отправить запрос на создание
    console.log('create board');
  }

  const [isModalActive, setIsModalActive] = useState(false);

  return (
    <div className="boards">
      <div className="boards_menu">
        <ButtonWithModalForm
          submitBtnName="Create Board"
          modalState={{ isModalActive, setIsModalActive }}
          buttonOptions={{
            btnClass: 'boards_create__btn',
            text: 'Add Board',
          }}
          formOptions={{
            ...formOptions,
            onSubmit: createBoardHandler,
            buttonOptions: {},
          }}
        />
      </div>
      <div className="boards_wrapper">
        {boards &&
          boards.map((board) => {
            return <BoardPreview {...board} key={board.id} />;
          })}
      </div>
    </div>
  );
}

export default Boards;
