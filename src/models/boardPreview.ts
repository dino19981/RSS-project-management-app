import { TBoard } from './board';

export type boardPreviewProps = TBoard & {
  refreshBoards: () => void;
};
