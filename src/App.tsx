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

const firstFields = [{ name: 'name', inputClass: 'qwe' }, { name: 'age' }];

type schema = {
  name: string;
  age: number;
};

function App() {
  function onSubmit(values: schema) {
    console.log(values);
  }

  return (
    <div className='App'>
      <Form
        schema={firstSchema}
        initialValues={firstInitVal}
        fields={firstFields}
        // requestData={{ url: 'url', methood: 'post' }}
        onSubmit={onSubmit}
        formId='formButton'
      />
      <button type='submit' form='formButton'>
        Submit
      </button>
    </div>
  );
}

export default App;
