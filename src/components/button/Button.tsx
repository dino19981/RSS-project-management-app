import { buttonProps } from '../../models/button';

export default function Button({ text, type, formId, icon, handler, btnClass }: buttonProps) {
  return (
    <button className={btnClass} onClick={handler} form={formId} type={type || 'button'}>
      {icon}
      {text}
    </button>
  );
}
