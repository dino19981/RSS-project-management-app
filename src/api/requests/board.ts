import { endpoints } from 'api/endpoints';
import { Methods } from 'const/APIMethod';
import { useAxios } from 'hooks/useAxios';
import { TColumn } from 'models/column';

type Board = {
  id: string;
  title: string;
  columns: TColumn[];
  description: string;
};

export function useGetBoards() {
  return useAxios<Board[]>({ url: endpoints.boards, method: Methods.GET });
}

export function useCreateBoard() {
  return useAxios<Board>(
    { url: endpoints.boards, method: Methods.POST },
    { dontFetchAtMount: true }
  );
}

export function useDeleteBoard(id: string) {
  const url = `${endpoints.boards}/${id}`;

  return useAxios({ url, method: Methods.DELETE }, { dontFetchAtMount: true });
}
