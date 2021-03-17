/* eslint-disable no-underscore-dangle */
import 'isomorphic-fetch';
import 'react-hot-loader/patch';

import React from 'react';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Modal from 'react-modal';
import { ThemeProvider } from 'styled-components';

import configureStore from 'sly/web/store/configure';
import theme from 'sly/common/components/themes/default';
import { hydrateComponents } from 'sly/web/services/partialHydration';
import { BreakpointProvider } from 'sly/web/components/helpers/breakpoint';
import GlobalStyles from 'sly/web/components/themes/GlobalStyles';

export default function partiallyHydrateClient(componentsToHydrate, routePath, root) {
  const initialState = window.__INITIAL_STATE__;
  const store = configureStore(initialState);

  Modal.setAppElement('#app');

  // eslint-disable-next-line react/prop-types
  const Providers = ({ children }) => (
    <Provider store={store}>
      <BreakpointProvider>
        <ThemeProvider theme={theme}>
          <Helmet>
            <style type="text/css">{GlobalStyles}</style>
          </Helmet>
          <BrowserRouter>
            <Route path={routePath} render={() => children} />
          </BrowserRouter>
        </ThemeProvider>
      </BreakpointProvider>
    </Provider>
  );

  hydrateComponents(componentsToHydrate, root, Providers);
}
