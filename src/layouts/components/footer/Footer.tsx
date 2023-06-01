import { githubIcon } from '../../../components/icons/Icons';
import { teamMembers } from '../../../const/teamData';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <ul className="footer__gh-list">
          {teamMembers.map(({ id, name }) => (
            <li key={id} className="footer__gh-item">
              <a className="footer__author-link" href="https://github.com/Romnasi">
                {githubIcon}
                <span className="footer__member-name">{name}</span>
              </a>
            </li>
          ))}
        </ul>

        <span className="footer__year">2022</span>
        <a className="footer__link footer__link--rss" href="https://rs.school/js/">
          <img src="/assets/images/rss-logo.svg" width="116" height="43" alt="RS School logo" />
        </a>
      </div>
    </footer>
  );
}
