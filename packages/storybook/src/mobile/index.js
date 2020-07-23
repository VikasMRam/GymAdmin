import React from 'react';
import { View } from 'react-native';
import { getStorybookUI, addDecorator, configure } from '@storybook/react-native';
import { ThemeProvider } from 'styled-components/native';

// this file will be generated automatically by react-native-storybook-loader package
// eslint-disable-next-line import/no-unresolved,import/extensions
import { loadStories } from './storyLoader';
import './addons';

import { addAppWrapper } from 'sly/storybook/preview.common';
import theme from 'sly/common/components/themes/default';

configure(() => {
  loadStories();
}, module);

addDecorator(addAppWrapper);

// add some margin to prevent overlap with mobile header
addDecorator(story => (
  <View style={{ marginTop: 50 }}>
    <ThemeProvider theme={theme}>
      {story()}
    </ThemeProvider>
  </View>
));

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage: null,
  shouldPersistSelection: false,
  onDeviceUI: false, // todo: this has bug. For now till they fix it use browser ui for controls.
});

export default StorybookUIRoot;
