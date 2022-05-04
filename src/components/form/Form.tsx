import React from 'react';
import { useFormik } from 'formik';
import { string } from 'yup';

type firstSchema = {
  name: string;
  age: number;
};

type secondSchema = {
  secondAge: number;
  secondName: string;
};

interface IFormField {
  schemaName: string;
  label?: string;
  inputClass?: string;
  labelClass?: string;
  type?: string;
  errorMessage?: string;
  placeholder?: string;
  selectClassName?: string;
}

type Props = {
  schema: secondSchema | firstSchema;
  initialValues: secondSchema | firstSchema;
  fields: IFormField[];
};

export default function Form({ schema, initialValues, fields }: Props) {
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values, 'values');
    },
  });
  console.log(formik.errors, 'formik.errors');

  type fieldName = keyof typeof schema;

  return (
    <form onSubmit={formik.handleSubmit}>
      {fields.map((field, id) => (
        <input
          key={id}
          name={field.schemaName}
          onChange={formik.handleChange}
          value={formik.values[field.schemaName as fieldName]}
        />
      ))}

      <button type='submit'>Submit</button>
    </form>
  );
}
