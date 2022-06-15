import React, { ChangeEvent, useRef, useState } from 'react';
import { throttle } from 'throttle-typescript';
import { findMatches } from '../../utils/search';
import { SEARCH_DELAY } from '../../views/pages/boards/const';
import Input from '../input/Input';
import Popover from '../popover/Popover';

export default function SearchField() {
  const [searchInputElement, setSearchInputElement] = useState<HTMLDivElement | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isPopoverActive, setIsPopoverActive] = useState(false);
  const throttledFoundTask = useRef(
    throttle((tasks, searchValue) => findMatches(tasks, searchValue), SEARCH_DELAY)
  );

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

  return (
    <>
      <Input
        placeholder="placeholders.search_tasks"
        elementRef={setSearchInputElement}
        value={searchValue}
        onChange={changeSearchValue}
        inputClass="boards__search"
        onFocus={openPopover}
      />
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
    </>
  );
}
