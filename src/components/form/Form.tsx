import React from 'react';
import { useFormik } from 'formik';
import Input from '../input/Input';
import { input } from '../../types/input';

type schema = {
  name: string;
  age: number;
};

const initialValues = {
  name: '',
  age: 0,
};

const fields: input[] = [
  { name: 'name', inputClass: 'inputClass', type: 'date' },
  { name: 'age', labelClass: 'labelClass' },
];

type Props = {
  schema: schema;
  initialValues: schema;
  fields: input[];
  isHaveButton?: boolean;
  formId?: string;
  onSubmit: (values: schema) => void;
};

export default function Form({
  schema,
  initialValues,
  fields,
  isHaveButton,
  formId,
  onSubmit,
}: Props) {
  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit,
  });

  type fieldName = keyof typeof schema;

  return (
    <form onSubmit={handleSubmit} id={formId}>
      {fields.map((field, id) => (
        <Input
          key={id}
          onChange={handleChange}
          value={values[field.name as fieldName]}
          isHaveError={!!errors[field.name as fieldName]}
          {...field}
        />
      ))}

      {isHaveButton && <button type='submit'>Submit</button>}
    </form>
  );
}
