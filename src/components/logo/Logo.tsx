import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/routes';
import { useAppSelector } from '../../store/hooks';

export default function Logo() {
  const { authorizeStatus } = useAppSelector((state) => state.authorization);

  const logoLink = authorizeStatus ? AppRoute.MAIN : AppRoute.WELCOME_PAGE;
  return (
    <Link className="logo" to={logoLink}>
      <span className="visually-hidden">Логотип</span>
      <img
        className="logo__image"
        src="assets/images/app-logo.png"
        width="40"
        height="49"
        alt="Логотип приложения"
      />
    </Link>
  );
}
