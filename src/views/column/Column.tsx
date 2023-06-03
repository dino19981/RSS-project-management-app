import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { TColumn } from '../../models/column';
import Loader from '../../components/loader/loader';
import { RootState } from '../../store/store';
import { connect, ConnectedProps } from 'react-redux';
import TopPanel from './topPanel/TopPanel';
import BottomPanel from './bottomPanel/BottomPanel';
import EmptyTaskPreview from 'views/Task/EmptyTaskPreview';
import Task from 'views/Task/Task';

function dragStart(e: React.DragEvent<HTMLDivElement>, id: string, title: string) {
  e.stopPropagation();
  e.dataTransfer.setData('columnId', id);
  e.dataTransfer.setData('columnTitle', title);
  e.dataTransfer.setData('element', 'column');
}

function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault();
}

function Column({ id: columnId, title, tasks, order, requestLoading }: TColumn & PropsFromRedux) {
  const { boardId } = useParams();

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

  return (
    <div
      className="column"
      draggable={true}
      onDragOver={(e) => dragOverHandler(e)}
      onDragStart={(e) => dragStart(e, columnId, title)}
      onDrop={(e) => dropHandler(e)}
    >
      <TopPanel data={{ boardId, columnId, title, order }} />

      <ul className="column__task-list">
        {tasks.map((task) => {
          return <Task key={task.id} columnId={columnId} {...task} />;
        })}

        <EmptyTaskPreview tasks={tasks} boardId={boardId} columnId={columnId} />
      </ul>

      <BottomPanel boardId={boardId} columnId={columnId} />

      {requestLoading && <Loader />}
    </div>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    requestLoading: state.board.requestLoading,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(memo(Column));
