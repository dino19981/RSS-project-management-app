import { useTranslation } from 'react-i18next';

export default function AboutCourse() {
  const { t } = useTranslation();
  return (
    <section className="about-course">
      <h2 className="about-course__title">{t('about_course.title')}</h2>
      <p className="about-course__desc">
        {t('about_course.desc1')}{' '}
        <a className="about-course__link" href="https://rs.school/js/">
          «JavaScript/Front-end»
        </a>{' '}
        {t('about_course.from')} RS School.
      </p>
      <p className="about-course__desc">{t('about_course.desc2')}</p>
    </section>
  );
}
