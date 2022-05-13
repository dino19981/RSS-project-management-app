import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/sass/main.scss';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './store/root-reducer';
import { instanceAxios } from './HTTP/configuration';
import { Provider } from 'react-redux';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: instanceAxios,
      },
    }),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
