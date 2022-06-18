import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TBoard } from '../../models/board';
import { TColumn } from '../../models/column';
import { BoardState } from '../../models/store';
import { createColumn, deleteBoard, getBoardData } from './actions';

const initialBoardState: BoardState = {
  board: {
    id: '',
    description: '',
    title: '',
    columns: [],
  },
  fetchError: '',
  fetchLoading: false,
  requestError: '',
  requestLoading: false,
};

const boardSlice = createSlice({
  name: 'board',
  initialState: initialBoardState,
  reducers: {},
  extraReducers: {
    // Get board data
    [getBoardData.fulfilled.type]: (state, action: PayloadAction<TBoard>) => {
      state.fetchLoading = false;
      state.fetchError = '';
      state.board = action.payload;
    },
    [getBoardData.rejected.type]: (state, action: PayloadAction<string>) => {
      state.fetchLoading = false;
      state.fetchError = action.payload;
    },
    [getBoardData.pending.type]: (state) => {
      state.fetchLoading = true;
    },

    // Delete board
    [deleteBoard.fulfilled.type]: (state) => {
      state.requestLoading = false;
      state.requestError = '';
      state.board = initialBoardState.board;
    },
    [deleteBoard.rejected.type]: (state, action) => {
      state.requestLoading = false;
      state.requestError = action.payload;
    },
    [deleteBoard.pending.type]: (state) => {
      state.requestLoading = true;
    },

    // Create column
    [createColumn.fulfilled.type]: (state, action: PayloadAction<TColumn>) => {
      state.requestLoading = false;
      state.requestError = '';
      state.board.columns.push(action.payload);
    },
    [createColumn.rejected.type]: (state, action) => {
      state.requestLoading = false;
      state.requestError = action.payload;
    },
    [createColumn.pending.type]: (state) => {
      state.requestLoading = true;
    },
  },
});

export default boardSlice;
