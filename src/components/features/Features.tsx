export default function Features() {
  return (
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
  );
}
