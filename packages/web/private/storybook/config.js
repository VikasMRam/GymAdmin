import React from 'react';
import Modal from 'react-modal';
import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import Helmet from 'react-helmet';


import configureStore from 'sly/web/store/configure';
import theme from 'sly/web/components/themes/default';
import GlobalStyles from 'sly/web/components/themes/GlobalStyles';

const store = configureStore({});
const req = require.context('sly/web/components', true, /.stories.js$/);

dayjs.extend(advancedFormat);
dayjs.extend(utc);

function configureStorybook() {
  req.keys().forEach(filename => req(filename));
  Modal.setAppElement('#root');
}

withOptions({
  hierarchySeparator: /\/|\./,
  hierarchyRootSeparator: /\|/,
});

addDecorator(story => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Helmet>
          <style type="text/css">{GlobalStyles}</style>
        </Helmet>
        {story()}
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
));

configure(configureStorybook, module);
