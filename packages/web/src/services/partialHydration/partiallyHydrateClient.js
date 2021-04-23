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
import theme from 'sly/common/system/theme';
import { hydrateComponents } from 'sly/web/services/partialHydration';
import { BreakpointProvider } from 'sly/web/components/helpers/breakpoint';
import GlobalStyles from 'sly/web/components/themes/GlobalStyles';
import { IconContext } from 'sly/common/system/Icon';
import { ApiProvider, createStore } from 'sly/web/services/api';

const apiState = window.__API_STATE__;
const initialState = window.__INITIAL_STATE__;
const apiStore = createStore(apiState);
const store = configureStore(initialState, { apiStore });

window.apiStore = apiStore;
export default function partiallyHydrateClient(componentsToHydrate, routePath, root) {
  Modal.setAppElement('#app');

  // eslint-disable-next-line react/prop-types
  const Providers = ({ children }) => (
    <ApiProvider value={{
      store: apiStore,
    }}
    >
      <Provider store={store}>
        <IconContext.Provider value={{}}>
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
        </IconContext.Provider>
      </Provider>
    </ApiProvider>
  );

  hydrateComponents(componentsToHydrate, root, Providers);
}
