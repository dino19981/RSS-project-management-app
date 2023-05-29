import { boardURL } from '../const/requestUrls';
import { instanceAxios } from '../api/configuration/axios';
import { TBoard } from '../models/board';
import { TColumn } from '../models/column';
import { TTask } from '../models/task';

export const findMatches = (items: TTask[], findedText: string): TTask[] => {
  return items.filter(({ title }) => {
    const searchInputValue = findedText.toLowerCase();
    return title.toLowerCase().slice(0, findedText.length) === searchInputValue;
  });
};

export async function getAllTasksInfo(boards: TBoard[]) {
  if (!boards) return [];
  const fullInfoBoards = await Promise.all(boards.map(({ id }) => instanceAxios.get(boardURL(id))));

  const allTasks: TTask[] = [];

  fullInfoBoards.forEach((boardResponse) => {
    const { columns, id: boardId } = boardResponse.data as TBoard;

    columns.forEach((column: TColumn) => {
      const { tasks, id: columnId } = column;

      tasks.forEach((task) => {
        const taskData = { ...task, columnId, boardId };
        allTasks.push(taskData);
      });
    });
  });

  return allTasks;
}
