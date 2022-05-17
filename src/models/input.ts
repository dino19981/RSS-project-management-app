import { ChangeEvent } from 'react';

export interface inputProps {
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
  isdisabled?: boolean;
}
