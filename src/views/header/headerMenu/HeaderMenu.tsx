import i18next from 'i18next';
import { useEffect, useState } from 'react';
import CreateBoard from '../createBoard/CreateBoard';
import LangSelect from '../langSelect/LangSelect';
import UserNav from '../userNav/UserNav';
import { useAppSelector } from '../../../store/hooks';
import { selectAuthStatus } from '../../../store/user/action';

export default function HeaderMenu() {
  const [isOpenNav, setIsOpenNav] = useState(false);
  const authorizeStatus = useAppSelector(selectAuthStatus);

  useEffect(() => {
    const lang = localStorage.getItem('i18nextLng');
    if (lang) {
      i18next.changeLanguage(lang);
    }
  }, []);

  return (
    <>
      <div className={isOpenNav ? 'menu menu--open' : 'menu'}>
        {authorizeStatus && <CreateBoard />}

        <LangSelect />

        <UserNav authorizeStatus={authorizeStatus} />
      </div>

      <button
        className="menu-toggle"
        type="button"
        onClick={() => {
          setIsOpenNav((prev) => !prev);
        }}
      >
        <span className="visually-hidden">Кнопка меню</span>
      </button>
    </>
  );
}
