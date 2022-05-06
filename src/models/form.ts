export interface formProps {
  schema: schema;
  initialValues: schema;
  fields: formField[];
  isHaveButton?: boolean;
  formId?: string;
  onSubmit: (values: schema) => void;
}

interface formField {
  name: string;
  label?: string;
  inputClass?: string;
  labelClass?: string;
  type?: string;
  errorMessage?: string;
  placeholder?: string;
  selectClassName?: string;
}

export type schema = {
  name: string;
  id: number;
};
