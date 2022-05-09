import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Layout from '../../layout/Layout';

export default function MainPage() {
  return (
    <Layout>
      <>
        <section>
          <h1>Приложение для управления проектами</h1>
          <p>Описание ключевых преимуществ</p>
        </section>

        <section>
          <h2>Преимущества</h2>
          <ul>
            <li>
              <h3>Преимущество 1</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto animi at, cumque
                optio, minima quia officia omnis, ipsam illum nisi sed incidunt? Inventore
                asperiores nihil suscipit recusandae facilis, aspernatur doloribus!
              </p>
            </li>
            <li>
              <h3>Преимущество 2</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto animi at, cumque
                optio, minima quia officia omnis, ipsam illum nisi sed incidunt? Inventore
                asperiores nihil suscipit recusandae facilis, aspernatur doloribus!
              </p>
            </li>
            <li>
              <h3>Преимущество 3</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto animi at, cumque
                optio, minima quia officia omnis, ipsam illum nisi sed incidunt? Inventore
                asperiores nihil suscipit recusandae facilis, aspernatur doloribus!
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
            <li>
              <article>
                <h3>Артем</h3>
                <span>Front-end</span>
                <p>Занимался тем-то и тем-то, делал пятое-десятое</p>
              </article>
            </li>
            <li>
              <article>
                <h3>Артем</h3>
                <span>Front-end</span>
                <p>Занимался тем-то и тем-то, делал пятое-десятое</p>
              </article>
            </li>
            <li>
              <article>
                <h3>Артем</h3>
                <span>Front-end</span>
                <p>Занимался тем-то и тем-то, делал пятое-десятое</p>
              </article>
            </li>
          </ul>
        </section>
      </>
    </Layout>
  );
}
