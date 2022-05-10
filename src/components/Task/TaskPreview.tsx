import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TTask } from '../../models/task';

function TaskPreview({ id, title, description, order, userId, done }: TTask) {
  const { pathname } = useLocation();
  const urlToTask = pathname + `/${id}`;
  return (
    <div className="task-preview">
      <Link to={urlToTask} className="task_link">
        TaskPreview
      </Link>
    </div>
  );
}

export default TaskPreview;
