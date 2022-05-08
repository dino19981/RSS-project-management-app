import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TColumn } from '../../models/column';
import Task from '../Task/Task';

function ColumnPreview({ id: columnId, order, title, tasks }: TColumn) {
  const { pathname } = useLocation();
  const urlToColumn = pathname + '/columns/' + columnId;

  return (
    <div className="column-preview">
      <Link to={urlToColumn} className="column-preview_link">
        <div className="column-preview_title">{title}</div>
        {tasks &&
          tasks.map((task) => {
            return <Task key={task.id} />;
          })}
      </Link>
    </div>
  );
}

export default ColumnPreview;
