import { useEffect, useState } from 'react';
import { ProcessingWrapper } from '../../../components/processingWrapper/ProcessingWrapper';
import { TTask } from '../../../models/task';
import { getAllTasksInfo } from '../../../utils/search';
import Loader from '../../../components/loader/loader';
import { useGetBoards } from 'shared/api/requests/board';
import { TasksSearchField } from 'components/TasksSearchField/TasksSearchField';
import { BoardPreview } from 'widgets/board/ui/BoardPreview';

export function Boards() {
  const [allTasks, setAllTasks] = useState<TTask[]>([]);

  const { data: boards, isLoading, error, request } = useGetBoards();

  useEffect(() => {
    if (!boards) return;

    getAllTasksInfo(boards).then(setAllTasks);
  }, [boards]);

  return (
    <div className="boards">
      <TasksSearchField itemsForSearch={allTasks} />

      <ProcessingWrapper isLoading={isLoading} error={error} items={boards}>
        <ul className="boards__list">
          {boards?.map((board) => (
            <BoardPreview key={board.id} {...board} updateBoards={request} />
          ))}
        </ul>
      </ProcessingWrapper>

      {isLoading && <Loader />}
    </div>
  );
}
