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
  const inputClassName = isHaveError ? `${inputClass} input__invalid` : inputClass;
  return (
    <label className={labelClass}>
      {labelText || ''}
      <input
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        placeholder={placeholder}
        defaultChecked={checked}
        className={inputClassName}
        type={type || 'text'}
        disabled={isdisabled}
        defaultValue={defaultValue}
      />
      {isHaveError && <div className="input__error">{errorMessage}</div>}
    </label>
  );
}
