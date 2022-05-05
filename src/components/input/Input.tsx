import { ChangeEvent } from 'react';

type Props = {
  labelText?: string;
  type?: string;
  inputClass?: string;
  labelClass?: string;
  isHaveError?: boolean;
  errorMessage?: string;
  checked?: boolean;
  name?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
};

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
}: Props) {
  return (
    <label className={labelClass}>
      {labelText || ''}
      <input
        onChange={onChange}
        value={value}
        name={name}
        placeholder={placeholder}
        defaultChecked={checked}
        className={inputClass}
        type={type || 'text'}
      />
      {isHaveError && <div className='input__error'>{errorMessage}</div>}
    </label>
  );
}
