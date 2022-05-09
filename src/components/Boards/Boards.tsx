import React, { useEffect } from 'react';
import { getBoards } from '../../common/api';
import { TBoard } from '../../models/board';
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

function Boards() {
  // let boards: TBoard[] | string;
  useEffect(() => {
    //TODO Загрузка  досок /boards
    // (async () => {
    //   boards = await getBoards();
    // })();
    // console.log(boards);
  }, []);

  return (
    <div className="boards">
      <div className="boards_menu">
        <button type="button">Создать доску</button>
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
