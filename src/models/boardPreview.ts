import { TBoard } from './board';

export type boardPreviewProps = TBoard & {
  updateBoards: () => void;
};
