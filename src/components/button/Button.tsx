import { ButtonProps } from '../../models/button';

export default function Button({
  text,
  type,
  formId,
  icon,
  handler,
  btnClass,
  isDisabled,
  isVisuallyHiddenText,
}: ButtonProps) {
  const btnClassName = isVisuallyHiddenText ? 'visually-hidden' : 'modal-button__text';
  return (
    <button
      className={`modal-button ${btnClass}`}
      onClick={handler}
      form={formId}
      type={type || 'button'}
      disabled={isDisabled}
    >
      {icon}
      <span className={btnClassName}>{text}</span>
    </button>
  );
}
