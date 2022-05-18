import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/routes';

export default function Logo() {
  return (
    <Link className="logo" to={AppRoute.MAIN}>
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
