import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import Input from '../../components/input/Input';
import Popover from '../../components/popover/Popover';
import ProcessingWrapper from '../../components/processingWrapper/ProcessingWrapper';
import { Methods } from '../../const/APIMethod';
import { boardsURL } from '../../const/requestUrls';
import { useAxios } from '../../hooks/useAxios';
import { TBoard } from '../../models/board';
import BoardPreview from './BoardPreview/BoardPreview';
import { throttle } from 'throttle-typescript';
import { TTask } from '../../models/task';
import { findMatches, getAllTasksInfo } from '../../utils/search';
import { SEARCH_DELAY } from './const';
import { descriptionIcon } from '../../components/icons/Icons';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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

  function closePopover() {
    setIsPopoverActive(false);
  }

  function openPopover() {
    if (searchValue) {
      setIsPopoverActive(true);
    }
  }

  function changeSearchValue(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    setSearchValue(inputValue);

    if (!isPopoverActive && inputValue !== '') {
      setIsPopoverActive(true);
    }

    if (inputValue === '') {
      closePopover();
    }
  }

  const foundedTasks = useMemo(
    () => throttledFoundTask.current(allTasks, searchValue),
    [searchValue, allTasks]
  );

  function navigateToTask(boardId: string, columnId: string, taskId: string) {
    navigate(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }

  return (
    <div className="boards">
      <Input
        placeholder="placeholders.search_tasks"
        elementRef={setSearchInputElement}
        value={searchValue}
        onChange={changeSearchValue}
        inputClass="boards__search"
        onFocus={openPopover}
      />

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

      {isPopoverActive && (
        <Popover
          reference={searchInputElement}
          placement="bottom-start"
          onClose={closePopover}
          popoverWrapperClass="popover__transparent-wrapper"
        >
          <ul className="search__list">
            {foundedTasks.map(({ boardId, columnId, id: taskId, title, description }) => (
              <li
                key={taskId}
                onClick={() => navigateToTask(boardId, columnId, taskId)}
                className="search__list-item"
              >
                <h5 className="search__task-title">{title}</h5>

                {description && (
                  <div className="search__description-wrapper">{descriptionIcon}</div>
                )}
              </li>
            ))}

            {!foundedTasks.length && (
              <h5 className="search__dont-find">{t('board.search_tasks_no_results')}</h5>
            )}
          </ul>
        </Popover>
      )}
    </div>
  );
}

export default Boards;
