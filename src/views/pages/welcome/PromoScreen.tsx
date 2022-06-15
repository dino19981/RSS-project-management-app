import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const/routes';
import { useAppSelector } from '../../../store/hooks';

export default function PromoScreen() {
  const { t } = useTranslation();
  const { authorizeStatus } = useAppSelector((state) => state.authorization);

  const buttonLink = authorizeStatus ? AppRoute.MAIN : AppRoute.REGISTRATION;
  const buttonText = authorizeStatus ? t('welcome.go_to_main_page') : t('welcome.start');

  return (
    <section className="promo-screen">
      <h1 className="promo-screen__title">{t('welcome.head_title')}</h1>
      <div className="promo-screen__image-wrapper">
        <img
          className="promo-screen__image"
          width="667"
          height="644"
          src="assets/images/image-hero.png"
          alt="Иллюстрация лотка с документами"
        />
      </div>
      <p className="promo-screen__desc">{t('welcome.head_text')}</p>
      <Link className="promo-screen__btn" to={buttonLink}>
        {buttonText}
      </Link>
    </section>
  );
}
