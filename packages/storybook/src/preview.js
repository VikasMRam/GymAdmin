import React from 'react';
import { addDecorator } from '@storybook/react';
import Modal from 'react-modal';
import Helmet from 'react-helmet';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import { ThemeProvider } from 'styled-components';

import { addAppWrapper } from './preview.common';

import theme from 'sly/common/components/themes/default';
import GlobalStyles from 'sly/web/components/themes/GlobalStyles';

const decoratedAddAppWrapper = story => addAppWrapper(story, (
  <Helmet>
    <style type="text/css">{GlobalStyles}</style>
  </Helmet>
));

dayjs.extend(advancedFormat);
dayjs.extend(utc);

Modal.setAppElement('#root');

addDecorator(story => (
  <ThemeProvider theme={theme}>
    {story()}
  </ThemeProvider>
));

addDecorator(decoratedAddAppWrapper);
