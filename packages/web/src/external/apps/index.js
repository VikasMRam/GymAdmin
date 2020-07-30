/* eslint-disable no-underscore-dangle, no-console */
// https://github.com/diegohaz/arc/wiki/Example-app
import 'react-hot-loader/patch';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { host } from 'sly/web/config';
import { getOrigin } from 'sly/web/services/helpers/url';
import configureStore from 'sly/web/external/apps/store/configure';
import App from 'sly/web/external/apps/App';

const store = configureStore({});

const renderApp = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
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
  module.hot.accept('./App', () => {
    require('./App');
    render(renderApp(), root);
  });
}
