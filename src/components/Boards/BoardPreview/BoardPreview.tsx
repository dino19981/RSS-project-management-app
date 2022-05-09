import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TBoard } from '../../../models/board';
import { TColumn } from '../../../models/column';
import Button from '../../button/Button';
import Modal from '../../modal/Modal';

function calculateTask(columns: TColumn[] | undefined) {
  if (columns === undefined) return null;
  let tasks = 0;
  columns.map((col) => {
    if (col.tasks) {
      tasks += col.tasks.length;
    }
  });
  return tasks;
}

function BoardPreview({ id, title, columns }: TBoard) {
  const taskCount = calculateTask(columns);

  const [isModalActive, setModal] = useState(false);

  function closeModal() {
    setModal(false);
  }

  function openModal() {
    setModal(true);
  }
  async function deleteBoard() {
    console.log('delete board');
  }

  return (
    <div className="board_preview">
      <Link to={`/boards/${id}`} className="board_preview__link">
        <div className="board_preview_title">{title}</div>
        {taskCount && <div className="board_preview__task-count">Total tasks: {taskCount}</div>}
      </Link>
      <div className="board_preview_footer">
        <Button handler={openModal} text="delete" />
        {isModalActive && (
          <Modal
            formId="modalForm"
            handleCloseModal={closeModal}
            submitBtnName="OK"
            handler={deleteBoard}
          >
            <div>Are you sure ?</div>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default BoardPreview;
