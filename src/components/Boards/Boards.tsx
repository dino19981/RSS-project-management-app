import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { TBoard } from '../../models/board';
import ButtonWithModalForm from '../buttonWithModalForm/ButtonWithModalForm';
import BoardPreview from './BoardPreview/BoardPreview';

const fakeBoards: TBoard[] = [
  {
    id: '9a111e19-24ec-43e1-b8c4-1',
    title: 'Homework tasks 11',
    columns: [
      {
        id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f',
        title: 'Done',
        order: 1,
        tasks: [
          {
            id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
            title: 'Task: pet the cat',
            order: 1,
            done: false,
            description: 'Domestic cat needs to be stroked gently',
            userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
            files: [
              {
                filename: 'foto.jpg',
                fileSize: 6105000,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '9a111e19-24ec-43e1-b8c4-2',
    title: 'Homework tasks 22',
    columns: [
      {
        id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f',
        title: 'Done',
        order: 1,
        tasks: [
          {
            id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
            title: 'Task: pet the cat',
            order: 1,
            done: false,
            description: 'Domestic cat needs to be stroked gently',
            userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
            files: [
              {
                filename: 'foto.jpg',
                fileSize: 6105000,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '9a111e19-24ec-43e1-b8c4-3',
    title: 'Homework tasks 333',
    columns: [
      {
        id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f',
        title: 'Done',
        order: 1,
        tasks: [
          {
            id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
            title: 'Task: pet the cat',
            order: 1,
            done: false,
            description: 'Domestic cat needs to be stroked gently',
            userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
            files: [
              {
                filename: 'foto.jpg',
                fileSize: 6105000,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '9a111e19-24ec-43e1-b8c4-4',
    title: 'Homework tasks 444',
    columns: [
      {
        id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f',
        title: 'Done',
        order: 1,
        tasks: [
          {
            id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
            title: 'Task: pet the cat',
            order: 1,
            done: false,
            description: 'Domestic cat needs to be stroked gently',
            userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
            files: [
              {
                filename: 'foto.jpg',
                fileSize: 6105000,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '9a111e19-24ec-43e1-b8c4-5',
    title: 'Homework tasks 555',
    columns: [
      {
        id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f',
        title: 'Done',
        order: 1,
        tasks: [
          {
            id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
            title: 'Task: pet the cat',
            order: 1,
            done: false,
            description: 'Domestic cat needs to be stroked gently',
            userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
            files: [
              {
                filename: 'foto.jpg',
                fileSize: 6105000,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '9a111e19-24ec-43e1-b8c4-6',
    title: 'Homework tasks 666',
    columns: [
      {
        id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f',
        title: 'Done',
        order: 1,
        tasks: [
          {
            id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
            title: 'Task: pet the cat',
            order: 1,
            done: false,
            description: 'Domestic cat needs to be stroked gently',
            userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
            files: [
              {
                filename: 'foto.jpg',
                fileSize: 6105000,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '9a111e19-24ec-43e1-b8c4-7',
    title: 'Homework tasks 777',
    columns: [
      {
        id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f',
        title: 'Done',
        order: 1,
        tasks: [
          {
            id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
            title: 'Task: pet the cat',
            order: 1,
            done: false,
            description: 'Domestic cat needs to be stroked gently',
            userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
            files: [
              {
                filename: 'foto.jpg',
                fileSize: 6105000,
              },
            ],
          },
        ],
      },
    ],
  },
];

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
  // let boards: TBoard[] | string;
  useEffect(() => {
    //TODO Загрузка  досок /boards
    // (async () => {
    //   boards = await getBoards();
    // })();
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
        {fakeBoards.map((board) => {
          return <BoardPreview {...board} key={board.id} />;
        })}
      </div>
    </div>
  );
}

export default Boards;
