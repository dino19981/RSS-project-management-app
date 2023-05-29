import { createAsyncThunk } from '@reduxjs/toolkit';
import { boardURL, columnsURL, columnURL, tasksURL, taskURL } from '../../../const/requestUrls';
import { instanceAxios } from '../../../api/configuration/axios';
import { TBoard } from '../../../models/board';
import { TUpdateTask } from '../../../models/task';
import {
  createColumnArgs,
  createTaskArgs,
  updateColumnArgs,
  TAddFileToTask,
  AllIds,
} from './models';

export const getBoardData = createAsyncThunk(
  'board/fetchBoardData',
  async (id: string, thunkAPI) => {
    try {
      const response = await instanceAxios.get<TBoard>(boardURL(id));
      const { columns } = response.data;
      const makeColumnOrder = [...columns].sort((a, b) => a.order - b.order);

      return { ...response.data, columns: makeColumnOrder };
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const deleteBoard = createAsyncThunk('board/deleteBoard', async (id: string, thunkAPI) => {
  try {
    await instanceAxios(boardURL(id), {
      method: 'delete',
    });
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const createColumn = createAsyncThunk(
  'column/creteColumn',
  async ({ boardId, values }: createColumnArgs, thunkAPI) => {
    try {
      const response = await instanceAxios.post(columnsURL(boardId), values);
      const columnData = { ...response.data, tasks: [] };
      return columnData;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'column/deleteColumn',
  async ({ boardId, columnId }: Omit<AllIds, 'taskId'>, thunkAPI) => {
    try {
      await instanceAxios.delete(columnURL(boardId, columnId));
      return columnId;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const updateColumnData = createAsyncThunk(
  'column/updateColumn',
  async (data: updateColumnArgs, thunkAPI) => {
    const { boardId, columnId, values } = data;

    try {
      const response = await instanceAxios.put(columnURL(boardId, columnId), values);

      return { ...response.data, columnId };
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось обновить колонку.');
    }
  }
);

export const createTask = createAsyncThunk(
  'task/createTask',
  async ({ boardId, columnId, values }: createTaskArgs, thunkAPI) => {
    try {
      const response = await instanceAxios.post(tasksURL(boardId, columnId), values);

      return { ...response.data, columnId, boardId };
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать задачу.');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async ({ boardId, columnId, taskId }: AllIds, thunkAPI) => {
    try {
      await instanceAxios.delete(taskURL(boardId, columnId, taskId));

      return { columnId, taskId };
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось удалить задачу.');
    }
  }
);

export const updateTask = createAsyncThunk(
  'task/updateTask',
  async (taskData: TUpdateTask, thunkAPI) => {
    const { taskId, boardId, columnId, ...otherData } = taskData;

    try {
      const { data } = await instanceAxios.put(taskURL(boardId, columnId, taskId), {
        ...otherData,
        boardId,
        columnId,
      });

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось обновить задачу.');
    }
  }
);

export const addFileToTask = createAsyncThunk(
  'task/addFileToTask',
  async (fileData: TAddFileToTask, thunkAPI) => {
    const { formData, taskId, fileName } = fileData;
    try {
      await instanceAxios.post('/file', formData);

      return { fileName, taskId };
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить файл.');
    }
  }
);
