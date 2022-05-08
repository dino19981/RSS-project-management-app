import React, { useEffect } from 'react';
import { TColumn } from '../../models/column';
import { TTask } from '../../models/task';
import Task from '../Task/Task';

function Column() {
  let tasks: undefined | TTask[];
  let column: undefined | TColumn;
  useEffect(() => {
    //TODO Загрузка  колонки /boards/:boardId/columns/:columnId
  }, []);

  return (
    <div className="column">
      {column && <div className="column_title">{column.title}</div>}
      {tasks &&
        tasks.map((task) => {
          return <Task key={task.id} />;
        })}
    </div>
  );
}

export default Column;
