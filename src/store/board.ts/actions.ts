import { createAsyncThunk } from '@reduxjs/toolkit';
import { boardURL, columnsURL } from '../../const/requestUrls';
import { instanceAxios } from '../../HTTP/configuration';
import { TBoard } from '../../models/board';
import { fieldsType } from '../../models/form';

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
