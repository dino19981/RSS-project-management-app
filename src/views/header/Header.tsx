import { useState, useEffect } from 'react';
import { throttle } from 'throttle-typescript';
import { MIN_SCROLL_Y, THROTTLE_DELAY } from './const';
import HeaderMenu from '../headerMenu/HeaderMenu';
import Logo from '../../components/logo/Logo';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);

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
        <Logo />
        <HeaderMenu />
      </div>
    </header>
  );
}
