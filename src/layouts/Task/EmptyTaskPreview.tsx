import React from 'react';
import { Methods } from '../../const/APIMethoods';
import { AppRoute } from '../../const/routes';
import { useAxios } from '../../hooks/useAxios';
import { TGetBoardTask } from '../../models/task';
import { generateTaskBody, generateTaskURL } from '../../utils/dragAndDrop';

type TProps = {
  boardId: string | undefined;
  columnId: string;
  update: () => Promise<void>;
  tasks: TGetBoardTask[];
};

export default function EmptyTaskPreview({ tasks, columnId, boardId, update }: TProps) {
  const { request } = useAxios({});

  async function dropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    console.log(' empty task Rdop');
    const dropTaskId = e.dataTransfer.getData('taskId');
    const dropTaskTitle = e.dataTransfer.getData('taskTitle');
    const dropTaskDescription = e.dataTransfer.getData('taskDescription');
    const dropColumnId = e.dataTransfer.getData('columnId');
    const dropUserId = e.dataTransfer.getData('userId');
    if (columnId === dropColumnId) {
      const url = generateTaskURL(boardId, columnId, dropTaskId);
      const data = generateTaskBody(dropTaskTitle, dropTaskDescription, columnId, tasks.length + 1);
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
        const url = generateTaskURL(boardId, dropColumnId, dropTaskId);
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
        const url = generateTaskURL(boardId, dropColumnId, dropTaskId);
        await request({
          url,
          method: Methods.DELETE,
        });
        await request({
          url: `${AppRoute.BOARDS}/${boardId}${AppRoute.COLUMNS}/${columnId}${AppRoute.TASKS}`,
          method: Methods.POST,
          data: {
            title: dropTaskTitle,
            description: dropTaskDescription,
            userId: dropUserId,
          },
        });
      }
    }
    await update();
  }
  return <div className="task-empty" draggable={true} onDrop={(e) => dropHandler(e)}></div>;
}
