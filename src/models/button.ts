export interface buttonProps {
  btnClass?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  text?: string;
  icon?: JSX.Element;
  handler?: (e?: React.MouseEvent<HTMLElement>) => void;
  formId?: string;
  isDisabled?: boolean;
}
