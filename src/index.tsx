import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/sass/main.scss';
import { Provider } from 'react-redux';

import './i18n';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
