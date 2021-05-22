/* eslint-disable no-underscore-dangle */
import 'intersection-observer';
import 'react-hot-loader/patch';
import 'isomorphic-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import AppWrapper from 'sly/web/components/AppWrapper';
import configureStore from 'sly/web/store/configure';
import { createStore } from 'sly/web/services/api';
import { isDev } from 'sly/web/config';
import { requestIdleCallback } from 'sly/web/requestIdleCallback';

// For Lazy loading images, used in ResponsiveImage
require('sly/web/services/yall');

const initialState = window.__INITIAL_STATE__;
const apiState = window.__API_STATE__;
const apiContext = { store: createStore(apiState) };
if (isDev) {
  window.apiStore = apiContext.store;
}
const store = configureStore(initialState, { apiStore: apiContext.store });

const AppRenderer = () => (
  <BrowserRouter>
    <AppWrapper
      apiContext={apiContext}
      iconsContext={{}}
      reduxStore={store}
    />
  </BrowserRouter>
);

if (typeof window.queueMicrotask !== 'function') {
  window.queueMicrotask = function (callback) {
    Promise.resolve()
      .then(callback)
      .catch(e => setTimeout(() => { throw e; })); // report exceptions
  };
}

window.addEventListener('load', () => {
  requestIdleCallback(() => {
    loadableReady(() => {
      queueMicrotask(() => {
        console.log('run hydrate');
        const rootElement = document.getElementById('app');
        ReactDOM.createRoot(rootElement, { hydrate: true }).render(<AppRenderer />);
      });
    });
  });
});
