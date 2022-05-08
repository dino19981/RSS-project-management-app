import React from 'react';
import { TBoard } from '../../../models/board';

type TProps = {
  board: TBoard;
};

function Board(props: TProps) {
  const { id, title, columns } = props.board;
  return <div>Board</div>;
}

export default Board;
