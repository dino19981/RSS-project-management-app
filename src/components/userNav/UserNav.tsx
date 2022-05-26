import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { navData } from '../../const/navData';

interface UserNavComponent {
  authorizeStatus: boolean;
}

export default function UserNav({ authorizeStatus }: UserNavComponent) {
  const { t } = useTranslation();
  const renderNavData = navData.filter(({ isAuthorize }) => isAuthorize === authorizeStatus);

  return (
    <nav className="user-nav">
      <ul className="user-nav__list">
        {renderNavData.map(({ title, path }) => (
          <li key={path} className="user-nav__item">
            <Link className="user-nav__link" to={path}>
              {t(title)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
