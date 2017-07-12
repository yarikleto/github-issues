import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components';
import './index.css';
import { Provider } from 'mobx-react';
import store from './stores/Store';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
