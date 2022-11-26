import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TBoard } from '../../models/board';
import { TColumn } from '../../models/column';
import { BoardState } from '../../models/store';
import { TTask } from '../../models/task';
import { findIndex } from '../../utils/arrayTools';
import {
  updateColumnData,
  createColumn,
  createTask,
  deleteBoard,
  deleteColumn,
  getBoardData,
  deleteTask,
  updateTask,
  addFileToTask,
} from './actions/actions';
import { AllIds, TAddFileToTask } from './actions/models';

const initialState: BoardState = {
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
  initialState,
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
      state.board = initialState.board;
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

      state.board.columns.forEach((column, ind) => {
        column.order = ind + 1;
      });
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

      state.board.columns[columnIndex] = {
        ...state.board.columns[columnIndex],
        order: +action.payload.order,
        title: action.payload.title,
      };

      state.requestLoading = false;
    },
    [updateColumnData.rejected.type]: (state, action) => {
      state.requestLoading = false;
      state.requestError = action.payload;
    },
    [updateColumnData.pending.type]: (state) => {
      state.requestLoading = true;
    },

    // Create task
    [createTask.fulfilled.type]: (state, action: PayloadAction<Omit<TTask, 'file'>>) => {
      const taskData = { ...action.payload, files: [] };

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

    // Delete task
    [deleteTask.fulfilled.type]: (state, action: PayloadAction<Omit<AllIds, 'boardId'>>) => {
      const { columnId, taskId } = action.payload;
      const columnIndex = findIndex(state.board.columns, columnId);
      const taskIndex = findIndex(state.board.columns[columnIndex].tasks, taskId);
      const tasks = state.board.columns[columnIndex].tasks;

      state.requestLoading = false;
      state.requestError = '';
      tasks.splice(taskIndex, 1);

      tasks.forEach((task, ind) => {
        task.order = ind + 1;
      });
    },
    [deleteTask.rejected.type]: (state, action) => {
      state.requestLoading = false;
      state.requestError = action.payload;
    },
    [deleteTask.pending.type]: (state) => {
      state.requestLoading = true;
    },

    // Update task
    [updateTask.fulfilled.type]: (state, action: PayloadAction<Omit<TTask, 'files'>>) => {
      const { columnId, id: taskId } = action.payload;

      const columnIndex = findIndex(state.board.columns, columnId);

      const taskIndex = findIndex(state.board.columns[columnIndex].tasks, taskId);

      const task = state.board.columns[columnIndex].tasks[taskIndex];

      state.board.columns[columnIndex].tasks[taskIndex] = { ...action.payload, files: task.files };
      state.requestLoading = false;
      state.requestError = '';
    },
    [updateTask.rejected.type]: (state, action) => {
      state.requestLoading = false;
      state.requestError = action.payload;
    },
    [updateTask.pending.type]: (state) => {
      state.requestLoading = true;
    },

    // add file to  task
    [addFileToTask.fulfilled.type]: (
      state,
      action: PayloadAction<Omit<TAddFileToTask, 'formData'>>
    ) => {
      const { taskId, fileName } = action.payload;
      // const columnIndex = findIndex(state.board.columns, columnId);
      // const taskIndex = findIndex(state.board.columns[columnIndex].tasks, taskId);
      // const task = state.board.columns[columnIndex].tasks[taskIndex];
      // state.board.columns[columnIndex].tasks[taskIndex] = { ...action.payload, files: task.files };
      state.requestLoading = false;
      state.requestError = '';
    },
    [addFileToTask.rejected.type]: (state, action) => {
      state.requestLoading = false;
      state.requestError = action.payload;
    },
    [addFileToTask.pending.type]: (state) => {
      state.requestLoading = true;
    },
  },
});

export const boardReducer = boardSlice.reducer;
