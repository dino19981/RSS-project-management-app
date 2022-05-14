import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TBoard } from '../../models/board';
import { BoardsState } from '../../models/store';

const initialState: BoardsState = {
  boards: [],
  currentBoard: null,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoards: (state, { payload }: PayloadAction<TBoard[]>) => {
      state.boards = payload;
    },
    setCurrentBoard: (state, { payload }: PayloadAction<TBoard>) => {
      state.currentBoard = payload;
    },
  },
});

export default boardsSlice;
