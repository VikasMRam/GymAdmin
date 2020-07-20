import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';

const RootComponent = __DEV__ && process.env.IS_STORYBOOK ?
  // eslint-disable-next-line import/order
  require('sly/storybook/mobile').default :
  // eslint-disable-next-line import/order
  require('./src/App').default;

AppRegistry.registerComponent(appName, () => RootComponent);
