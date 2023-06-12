import { AxiosError, Method } from 'axios';

export function getBoardsError(error: AxiosError): string | undefined {
  const messageByMethod: Partial<Record<Method, string>> = {
    get get() {
      if (error.config.params?.id) return 'error_messages.boards.cantGetBoard';
      return 'error_messages.boards.cantGetBoards';
    },
    get post() {
      return 'error_messages.boards.cantCreateBoard';
    },
    get patch() {
      return 'error_messages.boards.cantUpdateBoard';
    },
    delete: 'error_messages.boards.cantDeleteBoard',
  };

  return messageByMethod[error.config.method as Method];
}
