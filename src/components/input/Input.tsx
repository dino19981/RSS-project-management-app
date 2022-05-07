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
  value,
}: inputProps) {
  return (
    <label className={`label${labelClass || ''}`}>
      {labelText || ''}
      <input
        onChange={onChange}
        value={value}
        name={name}
        placeholder={placeholder}
        defaultChecked={checked}
        className={`input${inputClass || ''}`}
        type={type || 'text'}
      />
      {isHaveError && <div className="input__error">{errorMessage}</div>}
    </label>
  );
}
