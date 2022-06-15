import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { tasks } from '../../views/pages/boards/Boards';
import { descriptionIcon } from '../icons/Icons';

type listProps = {
  foundedItems: tasks[];
  onClickSearchItem: (boardId: string, columnId: string, taskId: string) => void;
};

function SearchResults({ foundedItems, onClickSearchItem }: listProps) {
  const { t } = useTranslation();

  return (
    <ul className="search__list">
      {foundedItems.map(({ boardId, columnId, id: taskId, title, description }) => (
        <li
          key={taskId}
          onClick={() => onClickSearchItem(boardId, columnId, taskId)}
          className="search__list-item"
        >
          <h5 className="search__task-title">{title}</h5>

          {description && <div className="search__description-wrapper">{descriptionIcon}</div>}
        </li>
      ))}

      {!foundedItems.length && (
        <h5 className="search__dont-find">{t('board.search_tasks_no_results')}</h5>
      )}
    </ul>
  );
}
export default memo(SearchResults, (prevProps, newProps) => {
  const isEqualArrays =
    JSON.stringify(prevProps.foundedItems) === JSON.stringify(newProps.foundedItems);

  if (isEqualArrays) {
    return true;
  }
  return false;
});
