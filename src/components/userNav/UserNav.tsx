import { Link, useNavigate } from 'react-router-dom';
import { navData } from './navData';
import { useAppDispatch } from './../../store/hooks';
import { deleteUserData } from '../../store/user/actions';
import { AppRoute } from '../../const/routes';

interface UserNavComponent {
  authorizeStatus: boolean;
}

export default function UserNav({ authorizeStatus }: UserNavComponent) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const renderNavData = navData.filter(({ isAuthorize }) => isAuthorize === authorizeStatus);

  const logout = () => {
    navigate(AppRoute.MAIN);
    dispatch(deleteUserData());
  };

  return (
    <nav className="user-nav">
      <ul className="user-nav__list">
        {renderNavData.map(({ title, path, type }) => {
          if (type !== 'button') {
            return (
              <li key={path} className="user-nav__item">
                <Link className="user-nav__link" to={path}>
                  {title}
                </Link>
              </li>
            );
          }
          return (
            <li key={path} className="user-nav__item">
              <button className="user-nav__link" onClick={logout}>
                {title}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
