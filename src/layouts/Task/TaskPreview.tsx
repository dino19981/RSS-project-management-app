import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TTask } from '../../models/task';

type TProps = TTask & {
  columnId?: string;
};

function TaskPreview({ id, title, description, order, userId, done, columnId }: TProps) {
  const { pathname } = useLocation();

  const urlToTask = columnId
    ? pathname + `/columns/${columnId}/tasks/${id}`
    : pathname + `/tasks/${id}`;
  return (
    <div className="task-preview">
      <Link to={urlToTask} className="task_link">
        TaskPreview
      </Link>
    </div>
  );
}

export default TaskPreview;
