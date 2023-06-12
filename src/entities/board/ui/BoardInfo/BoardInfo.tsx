import { Board } from 'shared/api/requests/board';
import styles from './style.module.scss';

type Props = Pick<Board, 'title' | 'description'>;

export function BoardInfo({ title, description }: Props) {
  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
