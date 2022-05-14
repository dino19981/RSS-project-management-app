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
  return (
    <button
      className={btnClass}
      onClick={handler}
      form={formId}
      type={type || 'button'}
      disabled={isDisabled}
    >
      {icon}
      {text}
    </button>
  );
}
