import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import App from './src/App';

import StorybookApp from 'sly/storybook/mobile';

if (__DEV__ && process.env.IS_STORYBOOK) {
  console.log('Storybook enabled. Launching that instead of main app.');
  AppRegistry.registerComponent(appName, () => StorybookApp);
} else {
  AppRegistry.registerComponent(appName, () => App);
}
