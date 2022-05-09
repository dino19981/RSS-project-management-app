import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/routes';
import UserNav from '../userNav/UserNav';

const authorizeStatus = true; // temporary

export default function Header() {
  return (
    <header className="header">
      <div className="header__container container">
        <Link className="header__logo header__link" to={AppRoute.MAIN}>
          Logo
        </Link>

        {authorizeStatus && <button>Create new board</button>}

        <UserNav authorizeStatus={authorizeStatus} />
      </div>
    </header>
  );
}
