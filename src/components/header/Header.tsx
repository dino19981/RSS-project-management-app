import { Link } from 'react-router-dom';
import { AppRoutes, navData } from '../../config/const';

const authorizeStatus = true; // temporary

export default function Header() {
  const renderNavData = navData.filter(({ isAuthorize }) => isAuthorize === authorizeStatus);

  return (
    <header className="header">
      <Link className="header__logo header__link" to={AppRoutes.MAIN}>
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
    </header>
  );
}
