/* eslint-disable no-underscore-dangle, no-console */
import 'babel-polyfill';
import 'react-hot-loader/patch';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ServerStateProvider } from 'react-router-server';
import Modal from 'react-modal';

import { createApi, ApiProvider } from 'sly/services/newApi';
import configureStore from 'sly/store/configure';
import { basename } from 'sly/config';
import DashboardApp from 'sly/components/DashboardApp';

Modal.setAppElement('#app');

const serverState = window.__SERVER_STATE__;
const initialState = window.__INITIAL_STATE__;
const api = createApi();
const store = configureStore(initialState);

const renderApp = () => (
  <ServerStateProvider state={serverState}>
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <ApiProvider api={api}>
          <DashboardApp />
        </ApiProvider>
      </BrowserRouter>
    </Provider>
  </ServerStateProvider>
);

const root = document.getElementById('app');

render(renderApp(), root);

if (module.hot) {
  module.hot.accept('components/DashboardApp', () => {
    require('components/DashboardApp');
    render(renderApp(), root);
  });
}
