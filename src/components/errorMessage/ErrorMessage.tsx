import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';

type Props = {
  message: string;
  className?: string;
};
export function ErrorMessage({ message, className }: Props) {
  const { t } = useTranslation();
  console.log(message);

  const classNames = className ? `${styles.text} ${className}` : styles.text;
  return <p className={classNames}>{t(message)}</p>;
}
