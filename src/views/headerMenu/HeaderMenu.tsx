import { useState } from 'react';
import CreateBoard from '../../components/createBoard/CreateBoard';
import LangSelect from '../../components/langSelect/LangSelect';
import UserNav from '../../components/userNav/UserNav';
import { useAppSelector } from '../../store/hooks';
import { selectAuthStatus } from '../../store/user/action';

export default function HeaderMenu() {
  const [isOpenNav, setIsOpenNav] = useState(false);
  const authorizeStatus = useAppSelector(selectAuthStatus);

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
