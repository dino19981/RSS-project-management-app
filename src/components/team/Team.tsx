import { teamMembers } from '../../const/teamData';

export default function Team() {
  return (
    <section className="team">
      <h2 className="team__title">Наша команда</h2>
      <ul className="team__list">
        {teamMembers.map(({ id, name, role, ghLink }) => (
          <li className="team__item" key={id}>
            <article className="team__card">
              <h3 className="team__name">{name}</h3>
              <span className="team__role">{role}</span>

              <div>
                <img
                  className="team__avatar"
                  width="200"
                  height="200"
                  src="https://i.pravatar.cc/300"
                  alt={`${name} - член команды разработки`}
                />
              </div>

              <p className="team__work">Сделал то то и то, работал над пятым десятым</p>

              <a className="team__member-link" href={ghLink} title="Посмотреть Github аккаунт">
                <span className="visually-hidden">Ссылка на гитхаб</span>
                <svg
                  className="team__gh-icon"
                  width="40"
                  height="40"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1024 1024"
                >
                  <use xlinkHref="#github-icon" />
                </svg>
              </a>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
