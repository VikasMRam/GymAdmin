/* eslint-disable no-underscore-dangle */
import '@babel/polyfill';
import 'react-hot-loader/patch';
import 'isomorphic-fetch';

import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-modal';
import { loadableReady } from '@loadable/component';

import RetentionPopup from 'sly/services/retentionPopup';
import App from 'sly/components/App';
import { ApiProvider, createApi } from 'sly/services/newApi';
import configureStore from 'sly/store/configure';
import WSProvider from 'sly/services/ws/WSProvider';
import NotificationSubscriptions from 'sly/services/notifications/Subscriptions';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

const beesApi = createApi();

const renderApp = () => (
  <ApiProvider api={beesApi}>
    <Provider store={store}>
      <WSProvider>
        <NotificationSubscriptions>
          <BrowserRouter>
            <>
              <RetentionPopup />
              <App />
            </>
          </BrowserRouter>
        </NotificationSubscriptions>
      </WSProvider>
    </Provider>
  </ApiProvider>
);

const root = document.getElementById('app');

Modal.setAppElement('#app');

loadableReady(() => {
  hydrate(renderApp(), root);
});

