import React, { useEffect } from 'react';
import { TColumn } from '../../../models/column';
import ColumnPreview from '../../Column/ColumnPreview';

function Board() {
  useEffect(() => {
    //TODO Загрузка  доски /board:id
  }, []);

  console.log('board');

  const columns: TColumn[] | undefined = [
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
  ];

  return (
    <div className="board">
      <div className="board_menu">
        <button type="button">create Column</button>
        <button type="button">delete board</button>
      </div>
      <div className="columns_wrapper">
        {columns
          ? columns.map((col) => {
              return <ColumnPreview key={col.id} column={col} />;
            })
          : null}
      </div>
    </div>
  );
}

export default Board;
