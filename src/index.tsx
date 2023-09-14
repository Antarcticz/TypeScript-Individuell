import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import 'bootstrap/dist/js/bootstrap.js'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './store/index'
import { CartProvider } from './utils/contexts/ThreadContext'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <CartProvider >
      <App />
    </CartProvider>
  </Provider>
);

reportWebVitals();
