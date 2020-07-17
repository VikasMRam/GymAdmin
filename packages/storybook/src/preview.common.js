import React from 'react';
import { Provider } from 'react-redux';

// import { BrowserRouter } from 'react-router-dom'; todo: use if any stories break. will remove in future if not required; remember that this file has common code used by react native

import configureStore from 'sly/web/store/configure';

const store = configureStore();

export const addAppWrapper = (story, rest = {}) => (
  <Provider store={store}>
    {story()}
    {rest}
  </Provider>
);
