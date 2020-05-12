/* eslint-disable no-underscore-dangle */
import '@babel/polyfill';
import 'isomorphic-fetch';
import 'react-hot-loader/patch';

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Modal from 'react-modal';
import { ThemeProvider } from 'styled-components';

import configureStore from 'sly/store/configure';
import theme from 'sly/components/themes/default';
import { hydrateComponents } from 'sly/services/partialHydration';

export default function partiallyHydrateClient(componentsToHydrate, routePath, root) {
  const initialState = window.__INITIAL_STATE__;
  const store = configureStore(initialState);

  Modal.setAppElement('#app');

  // eslint-disable-next-line react/prop-types
  const Providers = ({ children }) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Route path={routePath} render={() => children} />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );

  hydrateComponents(componentsToHydrate, root, Providers);
}
