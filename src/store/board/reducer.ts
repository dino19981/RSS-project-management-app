import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TBoard } from '../../models/board';
import { TColumn } from '../../models/column';
import { BoardState } from '../../models/store';
import { responseTask } from '../../models/task';
import {
  updateColumnData,
  createColumn,
  createTask,
  deleteBoard,
  deleteColumn,
  getBoardData,
} from './actions';

const findIndex = (allElements: TColumn[], idElement: string) => {
  return allElements.findIndex((currentElement) => currentElement.id === idElement);
};

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

    // Delete column
    [deleteColumn.fulfilled.type]: (state, action: PayloadAction<string>) => {
      const columnIndex = findIndex(state.board.columns, action.payload);

      state.requestLoading = false;
      state.requestError = '';
      state.board.columns.splice(columnIndex, 1);
    },
    [deleteColumn.rejected.type]: (state, action) => {
      state.requestLoading = false;
      state.requestError = action.payload;
    },
    [deleteColumn.pending.type]: (state) => {
      state.requestLoading = true;
    },

    // update column
    [updateColumnData.fulfilled.type]: (
      state,
      action: PayloadAction<{ title: string; order: string; columnId: string }>
    ) => {
      const columnIndex = findIndex(state.board.columns, action.payload.columnId);
      console.log(state.board.columns[columnIndex], 222);

      state.board.columns[columnIndex] = {
        ...state.board.columns[columnIndex],
        order: +action.payload.order,
        title: 'wqeqwe',
      };

      return state;
      // state.board.columns[columnIndex].order = +action.payload.order;
    },
    [updateColumnData.rejected.type]: (state, action) => {
      state.requestLoading = false;
      state.requestError = action.payload;
    },
    [updateColumnData.pending.type]: (state) => {
      state.requestLoading = true;
    },

    // Create task
    [createTask.fulfilled.type]: (state, action: PayloadAction<responseTask>) => {
      const taskOrder = state.board.columns.length + 1;
      const taskData = { ...action.payload, files: [], order: taskOrder };

      const columnIndex = findIndex(state.board.columns, action.payload.columnId);

      state.requestLoading = false;
      state.requestError = '';
      state.board.columns[columnIndex].tasks.push(taskData);
    },
    [createTask.rejected.type]: (state, action) => {
      state.requestLoading = false;
      state.requestError = action.payload;
    },
    [createTask.pending.type]: (state) => {
      state.requestLoading = true;
    },
  },
});

export default boardSlice;
