import { endpoints } from '../endpoints';
import { getBoardsError } from '../errors/entities/boards';
import { Methods } from 'const/APIMethod';
import { useAxios } from 'hooks/useAxios';
import { TColumn } from 'models/column';

export type Board = {
  id: string;
  title: string;
  description: string;
};

export function useGetBoards() {
  return useAxios<Board[]>(
    { url: endpoints.boards, method: Methods.GET },
    undefined,
    getBoardsError
  );
}

export function useCreateBoard() {
  return useAxios<Board>(
    { url: endpoints.boards, method: Methods.POST },
    { dontFetchAtMount: true },
    getBoardsError
  );
}

export function useDeleteBoard(id: string) {
  const url = `${endpoints.boards}/${id}`;

  return useAxios({ url, method: Methods.DELETE }, { dontFetchAtMount: true }, getBoardsError);
}
