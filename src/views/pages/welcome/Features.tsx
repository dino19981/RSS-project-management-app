import { useTranslation } from 'react-i18next';

const featuresData = [
  {
    imgSrc: 'assets/images/note.png',
    featureName: 'Note',
  },
  {
    imgSrc: 'assets/images/money.png',
    featureName: 'Money',
  },
  {
    imgSrc: 'assets/images/calendar.png',
    featureName: 'Calendar',
  },
];

export default function Features() {
  const { t } = useTranslation();
  return (
    <section className="features">
      <h2 className="features__title">{t('welcome.advantages')}</h2>
      <ul className="features__list">
        {featuresData.map(({ imgSrc, featureName }, index) => (
          <li className="features__item" key={t(`feature${index + 1}`)}>
            <article className="feature">
              <div className="feature__image-wrapper">
                <img
                  className={`feature__image feature__image--${featureName}`}
                  src={imgSrc}
                  alt={t(`feature1${index + 1}.altText`)}
                />
              </div>
              <div className="feature__text-wrapper">
                <h3 className="feature__title">{t(`feature${index + 1}.title`)}</h3>
                <p className="feature__desc">{t(`feature${index + 1}.description`)}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
