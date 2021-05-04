/* eslint-disable no-underscore-dangle */
import 'intersection-observer';
import 'react-hot-loader/patch';
import 'isomorphic-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-modal';
import { loadableReady } from '@loadable/component';

import App from 'sly/web/components/App';
import configureStore from 'sly/web/store/configure';
import PageEventsContainer from 'sly/web/containers/PageEventsContainer';
import { BreakpointProvider } from 'sly/web/components/helpers/breakpoint';
import { NotificationProvider } from 'sly/web/components/helpers/notification';
import { IconContext } from 'sly/common/system/Icon';
import { ApiProvider, createStore } from 'sly/web/services/api';
import { isDev } from 'sly/web/config';
import themeWithLegacy from 'sly/common/components/themes/themeWithLegacy';

// For Lazy loading images, used in ResponsiveImage
require('sly/web/services/yall');

const initialState = window.__INITIAL_STATE__;
const apiState = window.__API_STATE__;
const apiStore = createStore(apiState);
if (isDev) {
  window.apiStore = apiStore;
}
const store = configureStore(initialState, { apiStore });
const AppWrapper = () => (
  <ApiProvider
    value={{
      store: apiStore,
    }}
  >
    <Provider store={store}>
      <ThemeProvider theme={themeWithLegacy}>
        <IconContext.Provider value={{}}>
          <BreakpointProvider>
            <NotificationProvider>
              <BrowserRouter>
                <PageEventsContainer />
                <App />
              </BrowserRouter>
            </NotificationProvider>
          </BreakpointProvider>
        </IconContext.Provider>
      </ThemeProvider>
    </Provider>
  </ApiProvider>
);


Modal.setAppElement('#app');

loadableReady(() => {
  const rootElement = document.getElementById('app');
  ReactDOM.hydrate(<AppWrapper />, rootElement);
  // if (module.hot) {
  //   module.hot.accept('./components/App', () => {
  //     require('./components/App');
  //     console.log('rerendering');
  //     ReactDOM.render(rooteElement, <AppWrapper />);
  //   });
  // }
});

