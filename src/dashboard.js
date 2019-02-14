/* eslint-disable no-underscore-dangle, no-console */
import 'babel-polyfill';
import 'react-hot-loader/patch';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import configureStore from 'sly/store/configure';
import { basename, host, authTokenUrl } from 'sly/config';
import { getOrigin } from 'sly/services/helpers/url';
import api from 'sly/services/api';
import App from 'sly/components/DashboardApp';

const store = configureStore({}, { api: api.create({ credentials: 'include' }) });

const renderApp = () => (
  <Provider store={store}>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </Provider>
);

const root = document.getElementById('app');
const origin = getOrigin();

if (origin.indexOf(host) !== -1) {
  fetch(authTokenUrl, { credentials: 'same-origin' })
    .then(() => render(renderApp(), root));
} else {
  console.warn('Javascript not loading because CORS: got', origin, 'but was expecting', host);
}

if (module.hot) {
  module.hot.accept('components/DashboardApp', () => {
    require('components/DashboardApp');
    render(renderApp(), root);
  });
}
