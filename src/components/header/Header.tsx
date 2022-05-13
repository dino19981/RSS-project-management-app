import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/routes';
import UserNav from '../userNav/UserNav';
import { throttle } from 'throttle-typescript';
import { useSelector } from 'react-redux';
import { getAuthorizeStatus } from '../../store/data/selectors';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const authorizeStatus = useSelector(getAuthorizeStatus);

  useEffect(() => {
    window.addEventListener('scroll', getStickyThrottled);
    return () => {
      window.removeEventListener('scroll', getStickyThrottled);
    };
  });

  const getStickyStatus = () => {
    const scrollTop = window.scrollY;
    scrollTop >= 50 ? setIsSticky(true) : setIsSticky(false);
    console.log('scrollTop:', scrollTop);
  };

  const getStickyThrottled = throttle(getStickyStatus, 100);

  const headerClass = isSticky ? 'header header--sticky' : 'header';

  return (
    <header className={headerClass}>
      <div className="header__container container">
        <Link className="header__logo header__link" to={AppRoute.MAIN}>
          Logo
        </Link>

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
