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

        {authorizeStatus && (
          <button className="btn-new-board">
            <svg className="btn-new-board__icon" width="24" height="24">
              <use xlinkHref="#create-icon" />
            </svg>
            <span className="btn-new-board__text">Create new board</span>
          </button>
        )}

        <UserNav authorizeStatus={authorizeStatus} />
      </div>
    </header>
  );
}
