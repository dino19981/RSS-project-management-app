import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/routes';
import { teamMembers } from '../../const/teamData';
import UserNav from '../userNav/UserNav';
import { useAppSelector } from '../../store/hooks';
import { selectAuthStatus } from '../../store/user/action';

export default function Footer() {
  const authorizeStatus = useAppSelector(selectAuthStatus);

  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__wrapper">
          <Link to={AppRoute.MAIN} className="footer__link footer__logo logo">
            Logo
          </Link>

          <ul className="footer__gh-list">
            {teamMembers.map(({ id, name }) => (
              <li key={id} className="footer__gh-item">
                <a className="footer__author-link" href="https://github.com/Romnasi">
                  <svg className="footer__gh-icon" width="20" height="20">
                    <use xlinkHref="#github-icon" />
                  </svg>
                  <span className="footer__member-name">{name}</span>
                </a>
              </li>
            ))}
          </ul>

          <UserNav authorizeStatus={authorizeStatus} />
        </div>

        <div className="footer__logo-wrapper">
          <a className="footer__link footer__link--rss" href="https://rs.school/js/">
            <img src="assets/images/rss-logo.svg" width="116" height="43" alt="RS School logo" />
          </a>
          <span className="footer__year">2022</span>
        </div>
      </div>
    </footer>
  );
}
