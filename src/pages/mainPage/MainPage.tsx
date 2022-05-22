import { teamMembers } from '../../const/teamData';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/routes';

export default function MainPage() {
  return (
    <>
      <section className="promo-screen">
        <h1 className="promo-screen__title">Мастерски управляй проектами!</h1>
        <div className="promo-screen__image-wrapper">
          <img
            className="promo-screen__image"
            width="667"
            height="644"
            src="assets/images/image-hero.png"
            alt="Иллюстрация лотка с документами"
          />
        </div>
        <p className="promo-screen__desc">
          Бесплатное приложение для командной работы над проектами
        </p>
        <Link className="promo-screen__btn" to={AppRoute.REGISTRATION}>
          Начать
        </Link>
      </section>

      <section className="features">
        <h2 className="features__title">Преимущества</h2>
        <ul className="features__list">
          <li className="features__item">
            <article className="feature">
              <div className="feature__image-wrapper">
                <img
                  className="feature__image feature__image--note"
                  src="assets/images/note.png"
                  alt="Планшет с галочкой"
                />
              </div>
              <div className="feature__text-wrapper">
                <h3 className="feature__title">Преимущество 1</h3>
                <p className="feature__desc">
                  Задачи больше не теряются - все записано и отмечено, важные файлы прикреплены
                </p>
              </div>
            </article>
          </li>

          <li className="features__item">
            <article className="feature">
              <div className="feature__image-wrapper">
                <img
                  className="feature__image feature__image--money"
                  src="assets/images/money.png"
                  alt="Деньги"
                />
              </div>
              <div className="feature__text-wrapper">
                <h3 className="feature__title">Преимущество 1</h3>
                <p className="feature__desc">
                  Задачи больше не теряются - все записано и отмечено, важные файлы прикреплены
                </p>
              </div>
            </article>
          </li>

          <li className="features__item">
            <article className="feature">
              <div className="feature__image-wrapper">
                <img
                  className="feature__image feature__image--calendar"
                  src="assets/images/calendar.png"
                  alt="Календарь"
                />
              </div>
              <div className="feature__text-wrapper">
                <h3 className="feature__title">Преимущество 1</h3>
                <p className="feature__desc">
                  Задачи больше не теряются - все записано и отмечено, важные файлы прикреплены
                </p>
              </div>
            </article>
          </li>
        </ul>
      </section>

      <section className="about-course">
        <h2 className="about-course__title">О курсе</h2>
        <p className="about-course__desc">
          Бесплатное приложение для командной работы над проектом Бесплатное приложение для
          командной работы над проектом Бесплатное приложение для командной работы над проектом
        </p>
        <p className="about-course__desc">
          Бесплатное приложение для командной работы над проектом Бесплатное приложение для
          командной работы над проектом Бесплатное приложение для командной работы над проектом
        </p>
      </section>

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
    </>
  );
}
