type Props = {
  labelText?: string;
  type?: string;
  inputClass?: string;
  labelClass?: string;
  isHaveError?: boolean;
  errorMessage?: string;
  checked?: boolean;
  nameInSchema: string;
  placeholder?: string;
};

export default function Input({
  labelText,
  type,
  inputClass,
  labelClass,
  isHaveError,
  errorMessage,
  checked,
  placeholder,
}: Props) {
  return (
    <label className={labelClass ? `input__wrapper ${labelClass}` : 'input__wrapper'}>
      {labelText || ''}
      <input
        placeholder={placeholder}
        defaultChecked={checked}
        className={inputClass}
        type={type || 'text'}
        min={type === 'date' ? '1910-01-01' : ''}
        max={type === 'date' ? '2022-01-01' : ''}
      />
      {isHaveError && <div className='input__error'>{errorMessage}</div>}
    </label>
  );
}
