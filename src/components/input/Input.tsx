import { useTranslation } from 'react-i18next';
import { inputProps } from '../../models/input';

export default function Input({
  labelText,
  type,
  inputClass,
  labelClass,
  isHaveError,
  errorMessage,
  checked,
  name,
  placeholder,
  onChange,
  onBlur,
  value,
  isdisabled,
  defaultValue,
}: inputProps) {
  const { t } = useTranslation();
  const inputClassName = isHaveError ? `${inputClass} input__invalid` : inputClass;
  const labelClassName = labelClass ? `form__label ${labelClass}` : 'form__label';

  return (
    <label className={labelClassName}>
      <span className="form__label-text">{t(`${labelText || ''}`)}</span>
      <input
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        defaultChecked={checked}
        placeholder={placeholder}
        className={`form__input ${inputClassName || ''}`}
        type={type || 'text'}
        disabled={isdisabled}
        defaultValue={defaultValue}
      />
      {isHaveError && <span className="form__error-text">{errorMessage}</span>}
    </label>
  );
}
