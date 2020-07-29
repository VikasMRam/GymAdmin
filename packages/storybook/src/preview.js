import React from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-modal';
import Helmet from 'react-helmet';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';

import { addAppWrapper } from './preview.common';

import theme from 'sly/common/components/themes/default';
import GlobalStyles from 'sly/web/components/themes/GlobalStyles';

dayjs.extend(advancedFormat);
dayjs.extend(utc);

Modal.setAppElement('#root');

addDecorator(story => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      {story()}
    </ThemeProvider>
  </BrowserRouter>
));

addDecorator(addAppWrapper);

addDecorator(story => (
  <>
    {story()}
    <Helmet>
      <style type="text/css">{GlobalStyles}</style>
    </Helmet>
  </>
));
