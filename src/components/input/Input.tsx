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
  isdisabled,
}: inputProps) {
  const inputClassName = isHaveError ? `${inputClass} input__invalid` : inputClass;
  return (
    <label className={labelClass}>
      {labelText || ''}
      <input
        onChange={onChange}
        value={value}
        name={name}
        placeholder={placeholder}
        defaultChecked={checked}
        className={inputClassName}
        type={type || 'text'}
        disabled={isdisabled}
      />
      {isHaveError && <div className="input__error">{errorMessage}</div>}
    </label>
  );
}
