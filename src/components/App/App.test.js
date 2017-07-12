import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.component';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'mobx-react';
import store from '../../stores/Store';

describe('App', () => {
  test('Рендеринг компонентов без ошибок', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>, div);
  });
});
