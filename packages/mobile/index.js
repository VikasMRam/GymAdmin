import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import App from './src/App';

import StorybookApp from 'sly/storybook/mobile';

AppRegistry.registerComponent(appName, () => __DEV__ && process.env.IS_STORYBOOK ? StorybookApp : App);
