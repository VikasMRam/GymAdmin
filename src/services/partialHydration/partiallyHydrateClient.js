/* eslint-disable no-underscore-dangle */
import '@babel/polyfill';
import 'isomorphic-fetch';
import 'react-hot-loader/patch';

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ServerStateProvider } from 'react-router-server';
import Modal from 'react-modal';
import { ThemeProvider } from 'styled-components';
import Route from 'react-router/Route';

import { ApiProvider, createApi } from 'sly/services/newApi';
import configureStore from 'sly/store/configure';
import theme from 'sly/components/themes/default';
import { hydrateComponents } from 'sly/services/partialHydration/index';

export default function partiallyHydrateClient(componentsToHydrate, routePath, root) {
  const serverState = window.__SERVER_STATE__;
  const initialState = window.__INITIAL_STATE__;
  const store = configureStore(initialState);

  const beesApi = createApi();

  Modal.setAppElement('#app');

  // eslint-disable-next-line react/prop-types
  const Providers = ({ children }) => (
    <ServerStateProvider state={serverState}>
      <ApiProvider api={beesApi}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Route path={routePath} render={() => children} />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      </ApiProvider>
    </ServerStateProvider>
  );

  hydrateComponents(componentsToHydrate, root, Providers);
}
