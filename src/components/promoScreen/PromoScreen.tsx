import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/routes';

export default function PromoScreen() {
  return (
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
      <p className="promo-screen__desc">Бесплатное приложение для командной работы над проектами</p>
      <Link className="promo-screen__btn" to={AppRoute.REGISTRATION}>
        Начать
      </Link>
    </section>
  );
}
