import { useTranslation } from 'react-i18next';
import { teamMembers } from '../../const/teamData';
import { logoIcon } from '../icons/Icons';

export default function Team() {
  const { t } = useTranslation();
  return (
    <section className="team">
      <h2 className="team__title">{t('welcome.team')}</h2>
      <ul className="team__list">
        {teamMembers.map(({ id, name, role, ghLink, imgSrc, work }) => (
          <li className="team__item" key={id}>
            <article className="team__card">
              <h3 className="team__name">{t(`welcome.${name}`)}</h3>
              <span className="team__role">{role}</span>

              <div>
                <img
                  className="team__avatar"
                  width="200"
                  height="200"
                  src={imgSrc}
                  alt={`${name} - член команды разработки`}
                />
              </div>

              <span className="team__work-title">Роль в проекте</span>
              <p className="team__work">{work}</p>

              <a className="team__member-link" href={ghLink} title="Посмотреть Github аккаунт">
                <span className="visually-hidden">Ссылка на гитхаб</span>
                {logoIcon}
              </a>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
