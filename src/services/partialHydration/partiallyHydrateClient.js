/* eslint-disable no-underscore-dangle */
import '@babel/polyfill';
import 'isomorphic-fetch';
import 'intersection-observer';
import 'react-hot-loader/patch';

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-modal';
import { ThemeProvider } from 'styled-components';
import Route from 'react-router/Route';

import { ApiProvider, createApi } from 'sly/services/newApi';
import configureStore from 'sly/store/configure';
import theme from 'sly/components/themes/default';
import { hydrateComponents } from 'sly/services/partialHydration/index';

export default function partiallyHydrateClient(componentsToHydrate, routePath, root) {
  const initialState = window.__INITIAL_STATE__;
  const store = configureStore(initialState);

  const api = createApi();

  Modal.setAppElement('#app');

  // eslint-disable-next-line react/prop-types
  const Providers = ({ children }) => (
    <ApiProvider api={api}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Route path={routePath} render={() => children} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </ApiProvider>
  );

  hydrateComponents(componentsToHydrate, root, Providers);
}
