/* eslint-disable no-underscore-dangle */
// https://github.com/diegohaz/arc/wiki/Example-app
// for less frustration - https://stackoverflow.com/questions/46270984/warning-failed-prop-type-invalid-prop-children-of-type-object-supplied-to
import 'babel-polyfill';
import 'react-hot-loader/patch';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ServerStateProvider } from 'react-router-server';

import { resourceDetailReadRequest } from 'sly/store/resource/actions';
import { basename, host } from 'sly/config';
import { getOrigin } from 'sly/services/helpers/url';
import configureStore from 'sly/store/configure';
import api from 'sly/services/api';
import App from 'sly/components/App';

const serverState = window.__SERVER_STATE__;
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, { api: api.create({ credentials: 'include' }) });

const fetchUser = () => store.dispatch(resourceDetailReadRequest('user', 'me'));
const renderApp = () => (
  <ServerStateProvider state={serverState}>
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <App fetchUser={fetchUser} />
      </BrowserRouter>
    </Provider>
  </ServerStateProvider>
);

const root = document.getElementById('app');
const origin = getOrigin();

if (origin.indexOf(host) !== -1) {
  render(renderApp(), root);
} else {
  console.warn('Javascript not loading because CORS: got', origin, 'but was expecting', host);
}

if (module.hot) {
  module.hot.accept('components/App', () => {
    require('components/App');
    render(renderApp(), root);
  });
}
