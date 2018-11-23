import React from 'react';
import Modal from 'react-modal';
import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import configureStore from 'sly/store/configure';
import api from 'sly/services/api';
import theme from 'sly/components/themes/default';
import setGlobalStyles from 'sly/components/themes/setGlobalStyles';

const store = configureStore({}, { api: api.create() });
const req = require.context('sly/components', true, /.stories.js$/);

function configureStorybook() {
  req.keys().forEach(filename => req(filename));
  setGlobalStyles();
  Modal.setAppElement('#root');
}

setOptions({
  hierarchySeparator: /\/|\./,
  hierarchyRootSeparator: /\|/,
});

addDecorator(story => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>{story()}</ThemeProvider>
    </BrowserRouter>
  </Provider>
));

configure(configureStorybook, module);
