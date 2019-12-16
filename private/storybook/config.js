import React from 'react';
import Modal from 'react-modal';
import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';


import configureStore from 'sly/store/configure';
import theme from 'sly/components/themes/default';
import GlobalStyles from 'sly/components/themes/GlobalStyles';
import DatepickerStyles from 'sly/components/themes/DatepickerStyles';

const store = configureStore({});
const req = require.context('sly/components', true, /.stories.js$/);

dayjs.extend(advancedFormat);
dayjs.extend(utc);

function configureStorybook() {
  req.keys().forEach(filename => req(filename));
  Modal.setAppElement('#root');
}

setOptions({
  hierarchySeparator: /\/|\./,
  hierarchyRootSeparator: /\|/,
});

addDecorator(story => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/*<GlobalStyles />*/}
        <DatepickerStyles />
        {story()}
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
));

configure(configureStorybook, module);
