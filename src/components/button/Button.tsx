import { MouseEvent } from 'react';
import { buttonProps } from '../../models/button';

export default function Button({
  text,
  type,
  formId,
  icon,
  handler,
  btnClass,
  isDisabled,
}: buttonProps) {
  function onClick(e: MouseEvent<HTMLButtonElement>) {
    if (handler) {
      e.stopPropagation();
      handler();
    }
  }
  return (
    <button
      className={btnClass}
      onClick={(e) => onClick(e)}
      form={formId}
      type={type || 'button'}
      disabled={isDisabled}
    >
      {icon}
      {text}
    </button>
  );
}
