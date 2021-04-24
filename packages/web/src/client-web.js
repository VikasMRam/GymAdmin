/* eslint-disable no-underscore-dangle */
import 'intersection-observer';
import 'react-hot-loader/patch';
import 'isomorphic-fetch';

import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-modal';
import { loadableReady } from '@loadable/component';

import App from 'sly/web/components/App';
import configureStore from 'sly/web/store/configure';
import WSProvider from 'sly/web/services/ws/WSProvider';
import NotificationSubscriptions from 'sly/web/services/notifications/Subscriptions';
import PageEventsContainer from 'sly/web/containers/PageEventsContainer';
import { BreakpointProvider } from 'sly/web/components/helpers/breakpoint';
import { NotificationProvider } from 'sly/web/components/helpers/notification';
import { IconContext } from 'sly/common/system/Icon';
import { ApiProvider, createStore } from 'sly/web/services/api';

// For Lazy loading images, used in ResponsiveImage
require('sly/web/services/yall');

const initialState = window.__INITIAL_STATE__;
const apiState = window.__API_STATE__;
const apiStore = createStore(apiState);
window.apiStore = apiStore;
const store = configureStore(initialState, { apiStore });
const renderApp = () => (
  <ApiProvider
    value={{
      store: apiStore,
    }}
  >
    <Provider store={store}>
      <IconContext.Provider value={{}}>
        <BreakpointProvider>
          <NotificationProvider>
            <WSProvider>
              <NotificationSubscriptions>
                <BrowserRouter>
                  <PageEventsContainer />
                  <App />
                </BrowserRouter>
              </NotificationSubscriptions>
            </WSProvider>
          </NotificationProvider>
        </BreakpointProvider>
      </IconContext.Provider>
    </Provider>
  </ApiProvider>
);

const root = document.getElementById('app');

Modal.setAppElement('#app');

loadableReady(() => {
  hydrate(renderApp(), root);
  if (module.hot) {
    module.hot.accept('./components/App', () => {
      require('./components/App');
      console.log('rerendering');
      hydrate(renderApp(), root);
    });
  }
});

