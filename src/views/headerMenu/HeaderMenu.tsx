import i18next from 'i18next';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import UserNav from '../../components/userNav/UserNav';
import { useAppSelector } from '../../store/hooks';
import { selectAuthStatus } from '../../store/user/action';

export default function HeaderMenu() {
  const [isOpenNav, setIsOpenNav] = useState(false);
  const authorizeStatus = useAppSelector(selectAuthStatus);
  const { t } = useTranslation();

  function func(e: ChangeEvent<HTMLSelectElement>) {
    i18next.changeLanguage(e.target.value);
  }

  useEffect(() => {
    const lang = localStorage.getItem('i18nextLng');
    if (lang) {
      i18next.changeLanguage(lang);
    }
  }, []);

  return (
    <>
      <div className={isOpenNav ? 'menu menu--open' : 'menu'}>
        {authorizeStatus && (
          <button className="btn-new-board">
            <svg className="btn-new-board__icon" width="24" height="24">
              <use xlinkHref="#create-icon" />
            </svg>
            <span className="btn-new-board__text">{t('header.create_new_board')}</span>
          </button>
        )}

        <select
          className="lang-select"
          name="lang-select"
          id="lang-select"
          defaultValue={localStorage.getItem('i18nextLng') || 'en'}
          onChange={func}
        >
          <option className="lang-select__option" value="ru">
            {t('header.ru')}
          </option>
          <option className="lang-select__option" value="en">
            {t('header.en')}
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
