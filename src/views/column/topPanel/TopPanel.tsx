import React, { useState } from 'react';
import { t } from 'i18next';
import { connect, ConnectedProps } from 'react-redux';
import Button from '../../../components/button/Button';
import { deleteIcon } from '../../../components/icons/Icons';
import Modal from '../../../components/modal/Modal';
import { ErrorMessage } from '../../../const/errorMessage';
import { RootState } from '../../../models/store';
import { updateColumnData, deleteColumn } from '../../../store/board/actions';
import EditingTitle from './editingTitle/EditingTitle';

type Props = {
  data: { boardId: string | undefined; columnId: string; title: string; order: number };
};

function Header({ data, requestError, deleteColumn }: Props & PropsFromRedux) {
  const [isTitleEditActive, setIsTitleEditActive] = useState(false);
  const [titleNode, setTitleNode] = useState<HTMLDivElement | null>(null);
  const [isDeleteColumnModalActive, setIsDeleteColumnModalActive] = useState(false);

  const { boardId, columnId, title } = data;

  function openEditTitle() {
    setIsTitleEditActive(true);
  }

  function openDeleteModal(e?: React.MouseEvent<HTMLElement>) {
    e?.stopPropagation();
    setIsDeleteColumnModalActive(true);
  }

  function closeDeleteModal() {
    setIsDeleteColumnModalActive(false);
  }

  async function deleteColumnHandler() {
    if (!boardId) return;

    const response = await deleteColumn({ boardId, columnId });

    if (response.meta.requestStatus === 'fulfilled') {
      closeDeleteModal();
    }
  }

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
    <>
      <div ref={setTitleNode} onClick={openEditTitle} className="column__title-wrapper">
        <h4 className="column__title">{title}</h4>
        <Button handler={openDeleteModal} btnClass="task__delete_btn" icon={deleteIcon} />

        {isTitleEditActive && (
          <EditingTitle
            setIsTitleEditActive={setIsTitleEditActive}
            reference={titleNode}
            data={data}
          />
        )}
      </div>

      {isDeleteColumnModalActive && (
        <Modal {...deleteColumnOptions}>
          <p className="confirmation__text">{`${t('column.delete_column_message')} ${title}?`}</p>
        </Modal>
      )}
    </>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    requestError: state.board.requestError,
    requestLoading: state.board.requestLoading,
  };
};

const mapDispatchToProps = {
  updateColumnData,
  deleteColumn,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Header);
