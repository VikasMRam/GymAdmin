/* eslint-disable no-underscore-dangle, no-console */
// https://github.com/diegohaz/arc/wiki/Example-app
// for less frustration - https://stackoverflow.com/questions/46270984/warning-failed-prop-type-invalid-prop-children-of-type-object-supplied-to
import 'babel-polyfill';
import 'react-hot-loader/patch';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { host, authTokenUrl } from 'sly/config';
import { getOrigin } from 'sly/services/helpers/url';
import api from 'sly/services/api';
import configureStore from './store/configure';
import WizardApp from './WizardApp';

const store = configureStore({}, { api: api.create({ credentials: 'include' }) });

const renderApp = () => (
  <Provider store={store}>
    <BrowserRouter>
      <WizardApp />
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
  module.hot.accept('./WizardApp', () => {
    require('./WizardApp');
    render(renderApp(), root);
  });
}
