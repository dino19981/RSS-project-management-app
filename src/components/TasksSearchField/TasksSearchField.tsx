import React, { ChangeEvent, useRef, useState } from 'react';
import { throttle } from 'throttle-typescript';
import { TTask } from '../../models/task';
import { findMatches } from '../../utils/search';
import { SEARCH_DELAY } from '../../views/pages/boards/const';
import Input from '../input/Input';
import Popover from '../popover/Popover';
import SearchResults from './SearchResults';

type searchFieldProps = {
  itemsForSearch: TTask[];
};

export function TasksSearchField({ itemsForSearch }: searchFieldProps) {
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
          <SearchResults foundedItems={foundedItems} />
        </Popover>
      )}
    </>
  );
}
