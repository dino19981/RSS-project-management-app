enum URLS {
  BOARDS = '/boards',
  COLUMNS = '/columns',
  TASKS = '/tasks',
}

type IdType = string | undefined;

export function boardsURL(): string {
  return URLS.BOARDS;
}

export function boardURL(boardId: IdType): string {
  return `${boardsURL()}/${boardId}`;
}

export function columnsURL(boardId: IdType): string {
  return `${boardURL(boardId)}${URLS.COLUMNS}`;
}

export function columnURL(boardId: IdType, columnId: IdType): string {
  return `${columnsURL(boardId)}/${columnId}`;
}

export function tasksURL(boardId: IdType, columnId: IdType): string {
  return `${columnURL(boardId, columnId)}${URLS.TASKS}`;
}

export function taskURL(boardId: IdType, columnId: IdType, taskId: IdType): string {
  return `${tasksURL(boardId, columnId)}/${taskId}`;
}
