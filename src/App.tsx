import React from 'react';
import Form from './components/form/Form';
import * as yup from 'yup';

const firstSchema = yup
  .object()
  .shape({
    age: yup.number(),
    name: yup.string().required(),
  })
  .required();

const firstInitVal = {
  name: '',
  age: 0,
};

const firstFields = [{ schemaName: 'name' }, { schemaName: 'age' }];

const secondSchema = yup
  .object()
  .shape({
    secondAge: yup.number(),
    secondName: yup.string(),
  })
  .required();

const secondInitVal = {
  secondAge: 0,
  secondName: '',
};

const secondFields = [{ schemaName: 'secondAge' }, { schemaName: 'secondName' }];

function App() {
  return (
    <div className='App'>
      <Form schema={firstSchema} initialValues={firstInitVal} fields={firstFields} />
      <Form schema={secondSchema} initialValues={secondInitVal} fields={secondFields} />
    </div>
  );
}

export default App;
