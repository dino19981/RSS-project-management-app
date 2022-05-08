import React from 'react';
import { TColumn } from '../../models/column';
import Task from '../Task/Task';

type TProps = {
  column: TColumn;
};

function Column(props: TProps) {
  const { id, order, title, tasks } = props.column;

  return (
    <div className="column">
      <div className="column_title">{title}</div>
      {tasks?.map((task) => {
        return <Task key={task.id} />;
      })}
    </div>
  );
}

export default Column;
