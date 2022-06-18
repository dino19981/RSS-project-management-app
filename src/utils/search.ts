import { boardURL } from '../const/requestUrls';
import { instanceAxios } from '../HTTP/configuration';
import { TBoard } from '../models/board';
import { TColumn } from '../models/column';
import { searchListTasks } from '../models/task';

export const findMatches = (
  arrayItems: searchListTasks[],
  findedText: string
): searchListTasks[] => {
  return arrayItems.filter(({ title }) => {
    const searchInputValue = findedText.toLowerCase();
    return title.toLowerCase().slice(0, findedText.length) === searchInputValue;
  });
};

export async function getAllTasksInfo(boards: TBoard[]) {
  if (!boards) return [];
  const fullInfoBoards = await Promise.all(boards.map(({ id }) => instanceAxios.get(boardURL(id))));

  const tasks: searchListTasks[] = [];

  fullInfoBoards.forEach((boardResponse) => {
    const { columns, id: boardId } = boardResponse.data as TBoard;

    columns.forEach((column: TColumn) => {
      const { tasks, id: columnId } = column;

      tasks.forEach((task) => {
        const taskData = { ...task, columnId, boardId };
        tasks.push(taskData);
      });
    });
  });

  return tasks;
}
