/* eslint-disable no-underscore-dangle, no-console */
import 'babel-polyfill';
import 'react-hot-loader/patch';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-modal';

import { createApi, ApiProvider } from 'sly/services/newApi';
import configureStore from 'sly/store/configure';
import { basename } from 'sly/config';
import DashboardApp from 'sly/components/DashboardApp';

Modal.setAppElement('#app');

const initialState = window.__INITIAL_STATE__;
const api = createApi();
const store = configureStore(initialState);

const renderApp = () => (
  <Provider store={store}>
    <ApiProvider api={api}>
      <BrowserRouter basename={basename}>
        <DashboardApp />
      </BrowserRouter>
    </ApiProvider>
  </Provider>
);

const root = document.getElementById('app');

render(renderApp(), root);

if (module.hot) {
  module.hot.accept('components/DashboardApp', () => {
    require('components/DashboardApp');
    render(renderApp(), root);
  });
}
