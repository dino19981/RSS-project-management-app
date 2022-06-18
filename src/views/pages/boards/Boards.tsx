import { useEffect, useState, useMemo } from 'react';
import ProcessingWrapper from '../../../components/processingWrapper/ProcessingWrapper';
import { Methods } from '../../../const/APIMethod';
import { boardsURL } from '../../../const/requestUrls';
import { useAxios } from '../../../hooks/useAxios';
import { TBoard } from '../../../models/board';
import BoardPreview from './BoardPreview/BoardPreview';
import { searchListTasks } from '../../../models/task';
import { getAllTasksInfo } from '../../../utils/search';
import SearchField from '../../../components/searchField/SearchField';
import Loader from '../../../components/loader/loader';

function Boards() {
  const [allTasks, setAllTasks] = useState<searchListTasks[]>([]);

  const { data, isLoading, isError, request } = useAxios({
    url: boardsURL(),
    method: Methods.GET,
  });

  const boards = useMemo(() => data as TBoard[], [data]);

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
        <ProcessingWrapper isLoading={isLoading} isError={isError} errortext="error" items={boards}>
          {boards?.map((board) => {
            return (
              <li className="boards__item" key={board.id}>
                <BoardPreview {...board} updateBoards={request} />
              </li>
            );
          })}
        </ProcessingWrapper>
      </ul>
      {isLoading && <Loader />}
    </div>
  );
}

export default Boards;
