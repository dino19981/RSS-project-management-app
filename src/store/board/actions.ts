import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { boardURL, columnsURL, columnURL, tasksURL } from '../../const/requestUrls';
import { instanceAxios } from '../../HTTP/configuration';
import { TBoard } from '../../models/board';
import { fieldsType } from '../../models/form';
import { TColumnUpdateSchema } from '../../models/schemas';
import { createTaskData, responseTask } from '../../models/task';

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
  async ({ boardId, values }: { boardId: string; values: fieldsType }, thunkAPI) => {
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
  async ({ boardId, columnId }: { boardId: string; columnId: string }, thunkAPI) => {
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
  async (data: { boardId: string; columnId: string; values: TColumnUpdateSchema }, thunkAPI) => {
    const { boardId, columnId, values } = data;

    try {
      const response = await instanceAxios.put(columnURL(boardId, columnId), values);

      return { ...response.data, columnId };
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось обновить колонку.');
    }
  }
);

export const createTask = createAsyncThunk<
  responseTask,
  { boardId: string; columnId: string; values: createTaskData },
  {
    rejectValue: string;
  }
>('task/createTask', async ({ boardId, columnId, values }, thunkAPI) => {
  try {
    const response = await instanceAxios.post(tasksURL(boardId, columnId), values);

    return { ...response.data, columnId, boardId };
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось создать задачу.');
  }
});
