import React from 'react';
import { getStorybookUI, addDecorator, configure } from '@storybook/react-native';
import { ThemeProvider } from 'styled-components/native';

// this file will be generated automatically by react-native-storybook-loader package
// eslint-disable-next-line import/no-unresolved,import/extensions
import { loadStories } from './storyLoader';
import './addons';

import { addAppWrapper } from 'sly/storybook/preview.common';
import theme from 'sly/web/components/themes/default';

configure(() => {
  loadStories();
}, module);

addDecorator(addAppWrapper);

addDecorator(story => (
  <ThemeProvider theme={theme}>
    {story()}
  </ThemeProvider>
));

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage: null,
});

export default StorybookUIRoot;
