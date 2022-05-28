import { useTranslation } from 'react-i18next';
import { featuresData } from './featuresData';

export default function Features() {
  const { t } = useTranslation();
  return (
    <section className="features">
      <h2 className="features__title">{t('welcome.advantages')}</h2>
      <ul className="features__list">
        {featuresData.map(({ featureName, altText, title, description }) => (
          <li className="features__item" key={featureName}>
            <article className="feature">
              <div className="feature__image-wrapper">
                <img
                  className={`feature__image feature__image--${featureName}`}
                  src={`assets/images/${featureName}.png`}
                  alt={altText}
                />
              </div>
              <div className="feature__text-wrapper">
                <h3 className="feature__title">{title}</h3>
                <p className="feature__desc">{description}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
