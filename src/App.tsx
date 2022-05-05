import React, { useState } from 'react';
import ButtonWithModalForm from './components/buttonWithModalForm/ButtonWithModalForm';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    id: yup.string().required().label('ID элемента'),
    name: yup.string().required().label('Название'),
  })
  .required();

const initialValues = {
  id: 0,
  name: '',
};

const fields = [
  // Здесь в объектах можно передавать все что угодно - класс инпута для стилизации, тип инпута и т.д
  { name: 'name', errorMessage: 'ошибка в имени' },
  { name: 'id', errorMessage: 'ошибка в id' },
];

const onSubmit = (value: typeof schema) => {
  console.log(value, 'value');
  // Если запрос отработал положительно, то закрываем модалку (setIsModalActive(false))
  // Если приходит ошибка сервера, то можем вывести всплывающее окно и текст какой-нибудь в нем
};

const formOptions = {
  schema,
  initialValues,
  fields,
  onSubmit,
};

function App() {
  const [isModalActive, setIsModalActive] = useState(false);

  return (
    <div className="App">
      <ButtonWithModalForm
        formOptions={formOptions}
        buttonOptions={{ text: 'wq' }}
        modalState={{ isModalActive, setIsModalActive }}
        submitBtnName="Submit"
      />
    </div>
  );
}

export default App;
