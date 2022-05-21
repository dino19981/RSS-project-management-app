import { teamMembers } from '../../const/teamData';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/routes';

export default function MainPage() {
  return (
    <>
      <section className="promo-screen">
        <div className="promo-screen__text-wrapper">
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
        </div>
      </section>

      <section className="features">
        <h2 className="features__title">Преимущества</h2>
        <ul className="features__list">
          <li className="features__item">
            <article className="feature">
              <div className="feature__image-wrapper">
                <img className="feature__image" src="" alt="" />
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
                <img className="feature__image" src="" alt="" />
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
                <img className="feature__image" src="" alt="" />
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
          {teamMembers.map(({ id, name, role }) => (
            <li className="team__item" key={id}>
              <article className="team-member">
                <header className="team-member__base-info">
                  <div className="team-member__text-wrapper">
                    <h3 className="team-member__title">{name}</h3>
                    <span className="team-member__role">{role}</span>
                  </div>
                  <div className="team-member__image-wrapper">
                    <img src="" alt={name} width="60" height="60" />
                  </div>
                </header>
                <p className="team-member__desc">Занимался тем-то и тем-то, делал пятое-десятое</p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
