export interface buttonProps {
  btnClass?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  text?: string;
  icon?: JSX.Element;
  handler?: () => void;
  formId?: string;
}
