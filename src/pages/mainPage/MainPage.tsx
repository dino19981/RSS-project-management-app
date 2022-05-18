import { teamMembers } from '../../const/teamData';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/routes';

export default function MainPage() {
  return (
    <>
      <section className="promo-screen">
        <div className="promo-screen__text-wrapper">
          <h1 className="promo-screen__title">Мастерски управляй проектами!</h1>
          <p className="promo-screen__desc">
            Бесплатное приложение для командной работы над проектами
          </p>
          <Link className="promo-screen__btn" to={AppRoute.REGISTRATION}>
            Начать
          </Link>
        </div>
        <div className="promo-screen__image-wrapper">
          <img
            className="promo-screen__image"
            width="667"
            height="644"
            src="assets/images/image-hero.png"
            alt=""
          />
        </div>
      </section>

      <section className="feature">
        <h2 className="feature__title">Преимущества</h2>
        <ul className="feature__list">
          <li className="feature__item">
            <h3 className="feature__item-title">Преимущество 1</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto animi at, cumque
              optio, minima quia officia omnis, ipsam illum nisi sed incidunt? Inventore asperiores
              nihil suscipit recusandae facilis, aspernatur doloribus!
            </p>
          </li>
          <li>
            <h3>Преимущество 2</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto animi at, cumque
              optio, minima quia officia omnis, ipsam illum nisi sed incidunt? Inventore asperiores
              nihil suscipit recusandae facilis, aspernatur doloribus!
            </p>
          </li>
          <li>
            <h3>Преимущество 3</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto animi at, cumque
              optio, minima quia officia omnis, ipsam illum nisi sed incidunt? Inventore asperiores
              nihil suscipit recusandae facilis, aspernatur doloribus!
            </p>
          </li>
        </ul>
      </section>

      <section>
        <h2>О курсе</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto animi at, cumque optio,
          minima quia officia omnis, ipsam illum nisi sed incidunt? Inventore asperiores nihil
          suscipit recusandae facilis, aspernatur doloribus!
        </p>
      </section>

      <section>
        <h2>Наша команда</h2>
        <ul>
          {teamMembers.map(({ id, name, role }) => (
            <li key={id}>
              <article>
                <h3>{name}</h3>
                <span>{role}</span>
                <p>Занимался тем-то и тем-то, делал пятое-десятое</p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
