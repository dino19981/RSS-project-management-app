import React from 'react';
import { Methods } from '../../const/APIMethod';
import { tasksURL, taskURL } from '../../const/requestUrls';
import { useAxios } from '../../hooks/useAxios';
import { TGetBoardTask } from '../../models/task';
import { generateTaskBody } from '../../utils/dragAndDrop';

type TProps = {
  boardId: string | undefined;
  columnId: string;
  update: () => void;
  tasks: TGetBoardTask[];
};

export default function EmptyTaskPreview({ tasks, columnId, boardId, update }: TProps) {
  const { request } = useAxios({}, { dontFetchAtMount: true });

  async function dropHandler(e: React.DragEvent<HTMLDivElement>) {
    if (e.dataTransfer.getData('element') === 'column') {
      return;
    }
    e.stopPropagation();
    e.preventDefault();

    const dropTaskId = e.dataTransfer.getData('taskId');
    const dropTaskTitle = e.dataTransfer.getData('taskTitle');
    const dropTaskDescription = e.dataTransfer.getData('taskDescription');
    const dropColumnId = e.dataTransfer.getData('columnId');
    const dropUserId = e.dataTransfer.getData('userId');
    if (columnId === dropColumnId) {
      if (tasks.length === 1) return;
      const draggedTask = tasks.find((task) => task.id === dropTaskId);
      if (tasks.length === draggedTask!.order) {
        return;
      }
      const url = taskURL(boardId, columnId, dropTaskId);
      const data = generateTaskBody(dropTaskTitle, dropTaskDescription, columnId, tasks.length);
      await request({
        url,
        method: Methods.PUT,
        data: {
          ...data,
          userId: dropUserId,
          boardId,
        },
      });
    } else {
      if (tasks.length === 0) {
        const url = taskURL(boardId, dropColumnId, dropTaskId);
        const data = generateTaskBody(dropTaskTitle, dropTaskDescription, columnId);

        await request({
          url,
          method: Methods.PUT,
          data: {
            ...data,
            userId: dropUserId,
            boardId,
          },
        });
      } else {
        const url = taskURL(boardId, dropColumnId, dropTaskId);
        await request({
          url,
          method: Methods.DELETE,
        });
        await request({
          url: tasksURL(boardId, columnId),
          method: Methods.POST,
          data: {
            title: dropTaskTitle,
            description: dropTaskDescription,
            userId: dropUserId,
          },
        });
      }
    }
    update();
  }
  return <div className="task-empty" onDrop={(e) => dropHandler(e)}></div>;
}
