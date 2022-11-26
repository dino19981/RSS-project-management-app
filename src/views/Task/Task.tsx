import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { descriptionIcon, paperClipIcon } from '../../components/icons/Icons';
import { TTask } from '../../models/task';
import DeleteButton from './deleteButton/DeleteButton';

function dragStart(
  e: React.DragEvent<HTMLDivElement>,
  taskId: string,
  title: string,
  description: string,
  columnId: string,
  userId: string
) {
  e.stopPropagation();
  e.dataTransfer.setData('taskId', taskId);
  e.dataTransfer.setData('taskTitle', title);
  e.dataTransfer.setData('taskDescription', description);
  e.dataTransfer.setData('columnId', columnId);
  e.dataTransfer.setData('userId', userId);
  e.dataTransfer.setData('element', 'task');
}

function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault();
}

function Task({ id, title, description, columnId, userId, files }: Omit<TTask, 'boardId'>) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function openEditTask() {
    navigate(`${pathname}/columns/${columnId}/tasks/${id}`);
  }

  async function dropHandler(e: React.DragEvent<HTMLDivElement>) {
    // if (e.dataTransfer.getData('element') === 'column') {
    //   return;
    // }
    // e.preventDefault();
    // e.stopPropagation();
    // const dropTaskId = e.dataTransfer.getData('taskId');
    // const dropTaskTitle = e.dataTransfer.getData('taskTitle');
    // const dropTaskDescription = e.dataTransfer.getData('taskDescription');
    // const dropColumnId = e.dataTransfer.getData('columnId');
    // if (columnId === dropColumnId) {
    //   const url = taskURL(boardId, columnId, dropTaskId);
    //   const data = generateTaskBody(dropTaskTitle, dropTaskDescription, dropColumnId);
    //   await request({
    //     url,
    //     method: Methods.PUT,
    //     data: {
    //       ...data,
    //       userId,
    //       order,
    //       boardId,
    //     },
    //   });
    // } else {
    //   const url = taskURL(boardId, dropColumnId, dropTaskId);
    //   const data = generateTaskBody(dropTaskTitle, dropTaskDescription, columnId);
    //   await request({
    //     url,
    //     method: Methods.PUT,
    //     data: {
    //       ...data,
    //       userId,
    //       order,
    //       boardId,
    //     },
    //   });
    // }
  }

  return (
    <div className="task">
      <div
        className="task__inner"
        onClick={openEditTask}
        draggable={true}
        onDragOver={(e) => dragOverHandler(e)}
        onDragStart={(e) => dragStart(e, id, title, description, columnId, userId)}
        onDrop={(e) => dropHandler(e)}
      >
        <div className="task__link">{title}</div>

        <div className="task__icons-wrapper">
          <div>{descriptionIcon}</div>
          {!!files.length && <div>{paperClipIcon}</div>}
        </div>
      </div>

      <DeleteButton title={title} taskId={id} columnId={columnId} />
    </div>
  );
}

export default Task;
