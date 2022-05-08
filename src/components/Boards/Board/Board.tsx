import React, { useEffect } from 'react';
import { TColumn } from '../../../models/column';
import Column from '../../Column/Column';

function Board() {
  useEffect(() => {
    //TODO Загрузка  доски /board:id
  }, []);

  const columns: TColumn[] | undefined = [];

  return (
    <div className="board">
      <div className="board_menu">
        <button type="button">create Column</button>
        <button type="button">delete board</button>
      </div>

      <div className="columns_wrapper">
        {columns
          ? columns.map((col) => {
              return <Column key={col.id} column={col} />;
            })
          : null}
      </div>
    </div>
  );
}

export default Board;
