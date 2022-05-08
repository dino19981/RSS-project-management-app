import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TColumn } from '../../models/column';
import Task from '../Task/Task';

type TProps = {
  column: TColumn;
};

function Column(props: TProps) {
  const { id: columnId, order, title, tasks } = props.column;
  const { pathname } = useLocation();
  const urlToColumn = pathname + '/columns/' + columnId;

  return (
    <Link to={urlToColumn}>
      <div className="column">
        <div className="column_title">{title}</div>
        {tasks?.map((task) => {
          return <Task key={task.id} />;
        })}
      </div>
    </Link>
  );
}

export default Column;
