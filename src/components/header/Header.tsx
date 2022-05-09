import { Link } from 'react-router-dom';
import { AppRoute, navData } from '../../config/const';

const authorizeStatus = true; // temporary

export default function Header() {
  const renderNavData = navData.filter(({ isAuthorize }) => isAuthorize === authorizeStatus);

  return (
    <header className="header">
      <div className="header__container container">
        <Link className="header__logo header__link" to={AppRoute.MAIN}>
          Logo
        </Link>

        {authorizeStatus && <button>Create new board</button>}

        <nav className="header__nav">
          <ul className="header__nav-list">
            {renderNavData.map(({ title, path }) => (
              <li key={path} className="header__item">
                <Link className="header__link" to={path}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
