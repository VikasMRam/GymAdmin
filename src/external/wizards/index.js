/* eslint-disable no-underscore-dangle */
// https://github.com/diegohaz/arc/wiki/Example-app
import 'react-hot-loader/patch';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { basename, host } from 'sly/config';
import { getOrigin } from 'sly/services/helpers/url';
import api from 'sly/services/api';
import configureStore from './store/configure';
import WizardApp from './WizardApp';

const store = configureStore({}, { api: api.create({ credentials: 'include' }) });

const renderApp = () => (
  <Provider store={store}>
    <BrowserRouter basename={basename}>
      <WizardApp />
    </BrowserRouter>
  </Provider>
);

const root = document.getElementById('app');
const origin = getOrigin();

if (origin.indexOf(host) !== -1) {
  render(renderApp(), root);
} else {
  console.warn('Javascript not loading because CORS: got', origin, 'but was expecting', host);
}

if (module.hot) {
  module.hot.accept('./WizardApp', () => {
    require('./WizardApp');
    render(renderApp(), root);
  });
}
