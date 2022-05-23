import { useState } from 'react';
import UserNav from '../../components/userNav/UserNav';
import { useAppSelector } from '../../store/hooks';
import { selectAuthStatus } from '../../store/user/action';

export default function HeaderMenu() {
  const [isOpenNav, setIsOpenNav] = useState(false);
  const authorizeStatus = useAppSelector(selectAuthStatus);

  return (
    <>
      <div className={isOpenNav ? 'menu menu--open' : 'menu'}>
        {authorizeStatus && (
          <button className="btn-new-board">
            <svg className="btn-new-board__icon" width="24" height="24">
              <use xlinkHref="#create-icon" />
            </svg>
            <span className="btn-new-board__text">Создать новую доску</span>
          </button>
        )}

        <select className="lang-select" name="lang-select" id="lang-select" defaultValue="ru">
          <option className="lang-select__option" value="ru">
            Рус
          </option>
          <option className="lang-select__option" value="en">
            Анг
          </option>
        </select>

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
