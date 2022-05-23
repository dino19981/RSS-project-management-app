export default function LangSelect() {
  return (
    <select className="lang-select" name="lang-select" id="lang-select" defaultValue="ru">
      <option className="lang-select__option" value="ru">
        Рус
      </option>
      <option className="lang-select__option" value="en">
        Анг
      </option>
    </select>
  );
}
