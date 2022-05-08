import React, { useEffect } from 'react';
import { TColumn } from '../../models/column';
import ColumnPreview from './ColumnPreview';

function Column() {
  const columns: TColumn[] | null = [];
  useEffect(() => {
    //TODO Загрузка  колонок GET /boards/:boardId/columns
  }, []);

  return (
    <div className="columns">
      {columns
        ? columns.map((col) => {
            return <ColumnPreview column={col} key={col.id} />;
          })
        : null}
    </div>
  );
}

export default Column;
