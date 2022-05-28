export default function AboutCourse() {
  return (
    <section className="about-course">
      <h2 className="about-course__title">О курсе</h2>
      <p className="about-course__desc">
        Приложение разработано в рамках 3 этапа (React 2022Q1) обучения на бесплатном курсе{' '}
        <a className="about-course__link" href="https://rs.school/js/">
          «JavaScript/Front-end»
        </a>{' '}
        от RS School.
      </p>
      <p className="about-course__desc">
        Бесплатный курс от сообщества The Rolling Scopes для тех, кто хочет получить знания и опыт,
        достаточные для трудоустройства на позицию Junior Software Engineer в области
        JavaScript/Front-end.
      </p>
    </section>
  );
}
