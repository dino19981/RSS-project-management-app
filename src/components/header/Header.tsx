import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/routes';
import UserNav from '../userNav/UserNav';
import { throttle } from 'throttle-typescript';
import { useAppSelector } from '../../store/hooks';
import { selectAuthStatus } from '../../store/auth/action';
import { MIN_SCROLL_Y, THROTTLE_DELAY } from './const';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const authorizeStatus = useAppSelector(selectAuthStatus);

  useEffect(() => {
    window.addEventListener('scroll', getStickyThrottled);
    return () => {
      window.removeEventListener('scroll', getStickyThrottled);
    };
  });

  const getStickyStatus = () => {
    const scrollTop = window.scrollY;
    scrollTop >= MIN_SCROLL_Y ? setIsSticky(true) : setIsSticky(false);
  };

  const getStickyThrottled = throttle(getStickyStatus, THROTTLE_DELAY);

  const headerClass = isSticky ? 'header header--sticky' : 'header';

  return (
    <header className={headerClass}>
      <div className="header__container container">
        <Link className="header__logo header__link" to={AppRoute.MAIN}>
          Logo
        </Link>

        <select className="lang-select" name="lang-select" id="lang-select" defaultValue="ru">
          <option value="ru">Рус</option>
          <option value="en">Анг</option>
        </select>

        {authorizeStatus && (
          <button className="btn-new-board">
            <svg className="btn-new-board__icon" width="24" height="24">
              <use xlinkHref="#create-icon" />
            </svg>
            <span className="btn-new-board__text">Создать новую доску</span>
          </button>
        )}

        <UserNav authorizeStatus={authorizeStatus} />
      </div>
    </header>
  );
}
