import { TFunction, useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { navData } from './navData';
import { useAppDispatch } from './../../store/hooks';
import { deleteUserData } from '../../store/user/actions';
import { AppRoute } from '../../const/routes';
import { NavItem } from '../../models/userNav';
import { UserNavComponent } from '../../models/userNav';

const getNav = (
  renderNavData: NavItem[],
  logout: () => void,
  t: TFunction<'translation', undefined>
) => {
  return renderNavData.map(({ title, path, type }) => {
    if (type !== 'button') {
      return (
        <li key={path} className="user-nav__item">
          <Link className="user-nav__link" to={path}>
            {t(title)}
          </Link>
        </li>
      );
    }
    return (
      <li key={path} className="user-nav__item">
        <button className="user-nav__link" onClick={logout}>
          {t(title)}
        </button>
      </li>
    );
  });
};

export default function UserNav({ authorizeStatus }: UserNavComponent) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const renderNavData = navData.filter(({ isAuthorize }) => isAuthorize === authorizeStatus);

  const logout = () => {
    dispatch(deleteUserData());
    navigate(AppRoute.WELCOME_PAGE);
  };

  return (
    <nav className="user-nav">
      <ul className="user-nav__list">{getNav(renderNavData, logout, t)}</ul>
    </nav>
  );
}
