import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { searchListTasks } from '../../models/task';
import { descriptionIcon } from '../icons/Icons';

type listProps = {
  foundedItems: searchListTasks[];
};

function SearchResults({ foundedItems }: listProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  function navigateToTask(boardId: string, columnId: string, taskId: string) {
    navigate(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }

  return (
    <ul className="search__list">
      {foundedItems.map(({ boardId, columnId, id: taskId, title, description }) => (
        <li
          key={taskId}
          onClick={() => navigateToTask(boardId, columnId, taskId)}
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
