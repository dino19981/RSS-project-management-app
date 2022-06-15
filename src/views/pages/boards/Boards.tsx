import { useEffect, useState } from 'react';
import ProcessingWrapper from '../../../components/processingWrapper/ProcessingWrapper';
import { Methods } from '../../../const/APIMethod';
import { boardsURL } from '../../../const/requestUrls';
import { useAxios } from '../../../hooks/useAxios';
import { TBoard } from '../../../models/board';
import BoardPreview from './BoardPreview/BoardPreview';
import { TTask } from '../../../models/task';
import { getAllTasksInfo } from '../../../utils/search';
import SearchField from '../../../components/searchField/SearchField';

export type tasks = TTask & { columnId: string; boardId: string };

function Boards() {
  const [allTasks, setAllTasks] = useState<tasks[]>([]);

  const { data, isLoading, isError, request } = useAxios({
    url: boardsURL(),
    method: Methods.GET,
  });

  const boards = data as TBoard[];

  useEffect(() => {
    if (boards) {
      (async () => {
        const tasks = await getAllTasksInfo(boards);
        setAllTasks(tasks);
      })();
    }
  }, [boards]);

  return (
    <div className="boards">
      <SearchField itemsForSearch={allTasks} />

      <ul className="boards__list">
        <ProcessingWrapper isLoading={isLoading} isError={isError} errortext="error">
          {boards?.map((board) => {
            return (
              <li className="boards__item" key={board.id}>
                <BoardPreview {...board} updateBoards={request} />
              </li>
            );
          })}
        </ProcessingWrapper>
      </ul>
    </div>
  );
}

export default Boards;
