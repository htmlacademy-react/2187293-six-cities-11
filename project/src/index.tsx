import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import offers from './mocks/offers';
import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const variants = 312;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App variants={variants} offers={offers} />
    </Provider>
  </React.StrictMode>,
);
