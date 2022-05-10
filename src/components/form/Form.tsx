import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Input from '../input/Input';
import { formProps } from '../../models/form';
import Button from '../button/Button';

export default function Form({
  schema,
  initialValues,
  fields,
  isHaveButton,
  formId,
  onSubmit,
  buttonOptions,
  formClassName,
}: formProps) {
  const [isValidateOnChange, setIsValidateOnChange] = useState(false);
  const { handleChange, handleSubmit, values, errors, isSubmitting } = useFormik({
    initialValues,
    validationSchema: schema,
    validateOnChange: isValidateOnChange,
    onSubmit,
  });

  useEffect(() => {
    if (isSubmitting && !isValidateOnChange) {
      setIsValidateOnChange(true);
    }
  }, [isSubmitting]);

  type fieldName = keyof typeof schema;

  return (
    <form onSubmit={handleSubmit} id={formId} className={formClassName}>
      <fieldset>
        <ul>
          {fields.map((field, id) => (
            <li key={field.name}>
              <Input
                onChange={handleChange}
                value={values[field.name as fieldName]}
                isHaveError={!!errors[field.name as fieldName]}
                {...field}
              />
            </li>
          ))}
        </ul>
      </fieldset>
      {isHaveButton && <Button type="submit" {...buttonOptions} />}
    </form>
  );
}
