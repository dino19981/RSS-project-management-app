import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Button from '../../components/button/Button';
import ButtonWithModalForm from '../../components/buttonWithModalForm/ButtonWithModalForm';
import { createTaskFields } from '../../components/form/constants/fieldsOptions';
import { createTaskValues } from '../../components/form/constants/initialValues';
import { deleteIcon } from '../../components/icons/Icons';
import Modal from '../../components/modal/Modal';
import { Methods } from '../../const/APIMethod';
import { ErrorMessage } from '../../const/errorMessage';
import { columnURL } from '../../const/requestUrls';
import { useAxios } from '../../hooks/useAxios';
import { TColumn } from '../../models/column';
import { columSchema } from '../../schemas/column';
import { createTaskSchema } from '../../schemas/task';
import { useAppSelector } from '../../store/hooks';
import EmptyTaskPreview from '../Task/EmptyTaskPreview';
import Task from '../Task/Task';
import { plusIcon } from '../../components/icons/Icons';
import Loader from '../../components/loader/loader';
import { RootState } from '../../store/store';
import { createTask, deleteColumn, updateColumnData } from '../../store/board/actions';
import { createTaskData } from '../../models/task';
import EditTitle from './EditTitle';
import { connect, ConnectedProps } from 'react-redux';

const formOptions = {
  schema: createTaskSchema,
  initialValues: createTaskValues,
  fields: createTaskFields,
};

function dragStart(e: React.DragEvent<HTMLDivElement>, id: string, title: string) {
  e.stopPropagation();
  e.dataTransfer.setData('columnId', id);
  e.dataTransfer.setData('columnTitle', title);
  e.dataTransfer.setData('element', 'column');
}

function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault();
}

function Column({
  id: columnId,
  title,
  tasks,
  order,
  requestError,
  requestLoading,
  deleteColumn,
  updateColumnData,
  createTask,
}: TColumn & PropsFromRedux) {
  const { t } = useTranslation();
  const { boardId } = useParams();
  const [isCreateTaskModalActive, setIsCreateTaskModalActive] = useState(false);
  const [isDeleteColumnModalActive, setIsDeleteColumnModalActive] = useState(false);
  const [isPopoverActive, setIsPopoverActive] = useState(false);
  const [columnTitleElement, setColumnTitleElement] = useState<HTMLDivElement | null>(null);

  const { id: userId } = useAppSelector((state) => state.authorization);

  async function createTaskHandler(value: typeof createTaskSchema) {
    const requestData: createTaskData = { ...value, userId };

    if (!boardId) return;

    const createTaskResponse = await createTask({ boardId, columnId, values: requestData });

    if (createTaskResponse.meta.requestStatus === 'fulfilled') {
      setIsCreateTaskModalActive(false);
    }
  }

  async function dropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const id = e.dataTransfer.getData('columnId');
    const title = e.dataTransfer.getData('columnTitle');
    if (!id || !title) return;
    if (id !== columnId) {
      // await request({
      //   url: columnURL(boardId, id),
      //   method: Methods.PUT,
      //   data: {
      //     title,
      //     order,
      //   },
      // });
    }
    // updateBoard();
  }

  function openEditTitle() {
    setIsPopoverActive(true);
  }

  function closeEditTitle() {
    setIsPopoverActive(false);
  }

  async function updateTitle(value: typeof columSchema) {
    if (value.title === title) {
      setIsPopoverActive(false);
      return;
    }

    if (!boardId) return;

    const body = { order, ...value };
    const response = await updateColumnData({ boardId, columnId, values: body });

    if (response.meta.requestStatus === 'fulfilled') {
      setIsPopoverActive(false);
    }
  }

  async function deleteColumnHandler() {
    if (boardId) {
      await deleteColumn({ boardId, columnId });
      setIsDeleteColumnModalActive(false);
    }
  }

  function openDeleteModal(e?: React.MouseEvent<HTMLElement>) {
    e?.stopPropagation();
    setIsDeleteColumnModalActive(true);
  }

  function closeDeleteModal() {
    setIsDeleteColumnModalActive(false);
  }

  const addTaskOptions = {
    modalState: {
      isModalActive: isCreateTaskModalActive,
      setIsModalActive: setIsCreateTaskModalActive,
    },
    modalOptions: {
      submitBtnName: t('column.add_task'),
      isError: !!requestError,
      errorText: ErrorMessage.SERVER_ERROR,
    },
    buttonOptions: {
      btnClass: 'column__create-task-btn',
      text: t('column.add_task'),
      icon: plusIcon,
    },
    formOptions: { ...formOptions, onSubmit: createTaskHandler },
  };

  const deleteColumnOptions = {
    formId: 'modalForm',
    handleCloseModal: closeDeleteModal,
    contentWrapperClassName: 'modal__delete',
    submitBtnName: t('buttons.delete'),
    submitHandler: deleteColumnHandler,
    isError: !!requestError,
    errorText: ErrorMessage.SERVER_ERROR,
  };

  return (
    <div
      className="column"
      draggable={true}
      onDragOver={(e) => dragOverHandler(e)}
      onDragStart={(e) => dragStart(e, columnId, title)}
      onDrop={(e) => dropHandler(e)}
    >
      <div ref={setColumnTitleElement} onClick={openEditTitle} className="column__title-wrapper">
        <h4 className="column__title">{title}</h4>
        <Button handler={openDeleteModal} btnClass="task__delete_btn" icon={deleteIcon} />
      </div>

      <ul className="column__task-list">
        {tasks.map((task) => {
          return (
            <Task key={task.id} {...task} columnId={columnId} updateBoard={() => 'updateBoard'} />
          );
        })}
        <EmptyTaskPreview
          tasks={tasks}
          boardId={boardId}
          columnId={columnId}
          update={() => 'updateBoard'}
        />
      </ul>

      <ButtonWithModalForm {...addTaskOptions} />

      {isPopoverActive && (
        <EditTitle
          closeTitle={closeEditTitle}
          reference={columnTitleElement}
          title={title}
          updateTitle={updateTitle}
        />
      )}

      {isDeleteColumnModalActive && (
        <Modal {...deleteColumnOptions}>
          <p className="confirmation__text">{`${t('column.delete_column_message')} ${title}?`}</p>
        </Modal>
      )}
      {requestLoading && <Loader />}
    </div>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    requestError: state.board.requestError,
    requestLoading: state.board.requestLoading,
  };
};

const mapDispatchToProps = {
  deleteColumn,
  updateColumnData,
  createTask,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(memo(Column));
