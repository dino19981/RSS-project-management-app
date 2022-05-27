import i18next from 'i18next';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

export default function LangSelect() {
  const { t } = useTranslation();

  function func(e: ChangeEvent<HTMLSelectElement>) {
    i18next.changeLanguage(e.target.value);
  }

  return (
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
  );
}
