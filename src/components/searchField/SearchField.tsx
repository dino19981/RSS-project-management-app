import React, { ChangeEvent, memo, useMemo, useRef, useState } from 'react';
import { throttle } from 'throttle-typescript';
import { findMatches } from '../../utils/search';
import { tasks } from '../../views/pages/boards/Boards';
import { SEARCH_DELAY } from '../../views/pages/boards/const';
import Input from '../input/Input';
import Popover from '../popover/Popover';
import SearchResults from './SearchResults';

type searchFieldProps = {
  itemsForSearch: tasks[];
  onClickSearchItem: (boardId: string, columnId: string, taskId: string) => void;
};

export default function SearchField({ itemsForSearch, onClickSearchItem }: searchFieldProps) {
  const [searchInputElement, setSearchInputElement] = useState<HTMLDivElement | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isPopoverActive, setIsPopoverActive] = useState(false);
  const throttledFoundItems = useRef(
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

  const foundedItems = throttledFoundItems.current(itemsForSearch, searchValue);

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
          <SearchResults foundedItems={foundedItems} onClickSearchItem={onClickSearchItem} />
        </Popover>
      )}
    </>
  );
}
