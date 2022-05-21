export interface buttonProps {
  btnClass?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  text?: string;
  icon?: JSX.Element;
  handler?: (event?: MouseEvent | undefined) => void;
  formId?: string;
  isDisabled?: boolean;
}
