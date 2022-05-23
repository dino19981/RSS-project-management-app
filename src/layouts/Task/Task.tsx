import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Methods } from '../../const/APIMethoods';
import { AppRoute } from '../../const/routes';
import { useAxios } from '../../hooks/useAxios';
import { TGetBoardTask } from '../../models/task';
import { generateTaskBody, generateTaskURL } from '../../utils/dragAndDrop';

function dragStart(
  e: React.DragEvent<HTMLDivElement>,
  taskId: string,
  title: string,
  description: string,
  columnId: string,
  userId: string
) {
  e.dataTransfer.setData('taskId', taskId);
  e.dataTransfer.setData('taskTitle', title);
  e.dataTransfer.setData('taskDescription', description);
  e.dataTransfer.setData('columnId', columnId);
  e.dataTransfer.setData('userId', userId);
}

function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault();
}

type TProps = TGetBoardTask & {
  columnId: string;
  update: () => Promise<void>;
};

function TaskPreview({ id: taskId, title, description, order, userId, columnId, update }: TProps) {
  const { pathname } = useLocation();

  const { request } = useAxios({});
  const { boardId } = useParams();

  const urlToTask = columnId
    ? pathname + `${AppRoute.COLUMNS}/${columnId}${AppRoute.TASKS}/${taskId}`
    : pathname + `${AppRoute.TASKS}/${taskId}`;

  async function dropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    console.log('taskdrop');
    const dropTaskId = e.dataTransfer.getData('taskId');
    const dropTaskTitle = e.dataTransfer.getData('taskTitle');
    const dropTaskDescription = e.dataTransfer.getData('taskDescription');
    const dropColumnId = e.dataTransfer.getData('columnId');
    if (columnId === dropColumnId) {
      const url = generateTaskURL(boardId, columnId, dropTaskId);
      const data = generateTaskBody(dropTaskTitle, dropTaskDescription, columnId);
      await request({
        url,
        method: Methods.PUT,
        data: {
          ...data,
          userId,
          order,
          boardId,
        },
      });
    } else {
      const url = generateTaskURL(boardId, dropColumnId, dropTaskId);
      const data = generateTaskBody(dropTaskTitle, dropTaskDescription, columnId);
      await request({
        url,
        method: Methods.PUT,
        data: {
          ...data,
          userId,
          order,
          boardId,
        },
      });
    }
    await update();
  }

  return (
    <div
      className="task-preview"
      draggable={true}
      onDragOver={(e) => dragOverHandler(e)}
      onDragStart={(e) => dragStart(e, taskId, title, description, columnId, userId)}
      onDrop={(e) => dropHandler(e)}
    >
      <Link to={urlToTask} className="task_link">
        {title}
      </Link>
    </div>
  );
}

export default TaskPreview;
