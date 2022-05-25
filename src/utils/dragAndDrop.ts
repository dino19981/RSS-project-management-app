import { AppRoute } from '../const/routes';

export function generateTaskURL(boardId: string | undefined, columnId: string, taskId: string) {
  return `${AppRoute.BOARDS}/${boardId}${AppRoute.COLUMNS}/${columnId}${AppRoute.TASKS}/${taskId}`;
}

export function generateTaskBody(title: string, description: string, columnId: string, order = 1) {
  return {
    title,
    description,
    columnId,
    order,
  };
}
