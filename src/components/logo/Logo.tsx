import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/routes';

export default function Logo() {
  return (
    <Link className="header__logo" to={AppRoute.MAIN}>
      <span className="visually-hidden">Логотип</span>
      <img src="assets/images/app-logo.png" width="40" alt="Логотип приложения" />
    </Link>
  );
}
