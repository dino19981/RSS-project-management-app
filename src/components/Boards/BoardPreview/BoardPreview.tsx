import React from 'react';
import { Link } from 'react-router-dom';
import { TBoard } from '../../../models/board';
import { TColumn } from '../../../models/column';

type TProps = {
  board: TBoard;
};

function calculateTask(columns: TColumn[] | undefined) {
  if (columns === undefined) return null;
  let tasks = 0;
  columns.map((col) => {
    if (col.tasks) {
      tasks += col.tasks.length;
    }
  });
  return tasks;
}

function BoardPreview(props: TProps) {
  const { id, title, columns } = props.board;
  const taskCount = calculateTask(columns);

  return (
    <Link to={`/board/${id}`}>
      <div className="board">
        <div className="board_title">{title}</div>
        {taskCount ? <div className="board_task-count">Total tasks: {taskCount}</div> : null}
      </div>
    </Link>
  );
}

export default BoardPreview;
