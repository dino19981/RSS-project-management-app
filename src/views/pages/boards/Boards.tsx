import { useEffect, useState } from 'react';
import ProcessingWrapper from '../../../components/processingWrapper/ProcessingWrapper';
import BoardPreview from './BoardPreview/BoardPreview';
import { TTask } from '../../../models/task';
import { getAllTasksInfo } from '../../../utils/search';
import Loader from '../../../components/loader/loader';
import { useGetBoards } from 'api/requests/board';
import { TasksSearchField } from 'components/TasksSearchField/TasksSearchField';

function Boards() {
  const [allTasks, setAllTasks] = useState<TTask[]>([]);

  const { data: boards, isLoading, isError, request } = useGetBoards();

  useEffect(() => {
    if (!boards) return;

    getAllTasksInfo(boards).then(setAllTasks);
  }, [boards]);

  return (
    <div className="boards">
      <TasksSearchField itemsForSearch={allTasks} />

      <ul className="boards__list">
        <ProcessingWrapper
          isLoading={isLoading}
          isError={isError}
          errortext="Не удалось загрузить доски, попробуйте позже"
          items={boards}
        >
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
