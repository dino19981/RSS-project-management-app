import { AxiosError, Method } from 'axios';

export function getBoardsError(error: AxiosError): string | undefined {
  const messageByMethod: Partial<Record<Method, string>> = {
    get get() {
      if (error.config.params?.id) return 'boards.cantGetBoard';
      return 'boards.cantGetBoards';
    },
    get post() {
      return 'boards.cantCreateBoard';
    },
    get patch() {
      return 'boards.cantUpdateBoard';
    },
    delete: 'boards.cantDeleteBoard',
  };

  return messageByMethod[error.config.method as Method];
}
