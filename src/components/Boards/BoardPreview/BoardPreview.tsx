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
    <Link to={`/boards/${id}`}>
      <div className="board_preview">
        <div className="board_preview_title">{title}</div>
        {taskCount && <div className="board_preview__task-count">Total tasks: {taskCount}</div>}
      </div>
    </Link>
  );
}

export default BoardPreview;
