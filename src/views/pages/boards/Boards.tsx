import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import Input from '../../../components/input/Input';
import Popover from '../../../components/popover/Popover';
import ProcessingWrapper from '../../../components/processingWrapper/ProcessingWrapper';
import { Methods } from '../../../const/APIMethod';
import { boardsURL } from '../../../const/requestUrls';
import { useAxios } from '../../../hooks/useAxios';
import { TBoard } from '../../../models/board';
import BoardPreview from './BoardPreview/BoardPreview';
import { throttle } from 'throttle-typescript';
import { TTask } from '../../../models/task';
import { findMatches, getAllTasksInfo } from '../../../utils/search';
import { SEARCH_DELAY } from './const';
import { descriptionIcon } from '../../../components/icons/Icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SearchField from '../../../components/searchField/SearchField';

export type tasks = TTask & { columnId: string; boardId: string };

function Boards() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchInputElement, setSearchInputElement] = useState<HTMLDivElement | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isPopoverActive, setIsPopoverActive] = useState(false);
  const [allTasks, setAllTasks] = useState<tasks[]>([]);
  const throttledFoundTask = useRef(
    throttle((tasks, searchValue) => findMatches(tasks, searchValue), SEARCH_DELAY)
  );

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

  const foundedTasks = useMemo(
    () => throttledFoundTask.current(allTasks, searchValue),
    [searchValue, allTasks]
  );

  function navigateToTask(boardId: string, columnId: string, taskId: string) {
    navigate(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }

  return (
    <div className="boards">
      <SearchField />

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
