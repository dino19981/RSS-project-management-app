import { AppRoute } from '../../const/routes';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  const token = localStorage.getItem('token');
  const navigateTo = token ? AppRoute.BOARDS : AppRoute.MAIN;
  return (
    <>
      <h1 className="glitch" data-text="404">
        404
      </h1>
      <p className="glitch glitch--sub" data-text="Извините страница не найдена">
        Извините страница не найдена
      </p>
      <Link className="btn btn--to-main" to={navigateTo}>
        Перейти на главную
      </Link>
    </>
  );
}
