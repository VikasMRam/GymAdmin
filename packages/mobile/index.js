import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import MainApp from './src/MainApp';

import StorybookApp from 'sly/storybook/mobile';

if (__DEV__ && process.env.IS_STORYBOOK) {
  // eslint-disable-next-line no-console
  console.log('Storybook enabled. Launching that instead of main app.');
  AppRegistry.registerComponent(appName, () => StorybookApp);
} else {
  AppRegistry.registerComponent(appName, () => MainApp);
}
