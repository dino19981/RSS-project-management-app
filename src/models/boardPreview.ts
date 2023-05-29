import { UseAxiosReturn } from 'hooks/useAxios';
import { TBoard } from './board';

export type boardPreviewProps = TBoard & {
  updateBoards: UseAxiosReturn<TBoard[]>['request'];
};
