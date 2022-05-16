import { teamMembers } from '../../const/teamData';
import UserNav from '../../components/userNav/UserNav';
import { useAppSelector } from '../../store/hooks';
import { selectAuthStatus } from '../../store/user/action';
import Logo from '../../components/logo/Logo';

export default function Footer() {
  const authorizeStatus = useAppSelector(selectAuthStatus);

  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__wrapper">
          <Logo />

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
