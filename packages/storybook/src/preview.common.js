import React from 'react';
import { Provider } from 'react-redux';

import configureStore from 'sly/web/store/configure';

const store = configureStore();

export const addAppWrapper = story => (
  <Provider store={store}>
    {story()}
  </Provider>
);
