import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TBoard } from '../../models/board';
import { TColumn } from '../../models/column';
import { BoardsState } from '../../models/store';

const initialState: BoardsState = {
  boards: [],
  currentBoard: null,
  columns: [],
  currentColumn: null,
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
    setColumns: (state, { payload }: PayloadAction<TColumn[]>) => {
      state.columns = payload;
    },
    setCurrentColumn: (state, { payload }: PayloadAction<TColumn>) => {
      state.currentColumn = payload;
    },
  },
});

export default boardsSlice;
