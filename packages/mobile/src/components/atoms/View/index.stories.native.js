import React from 'react';
import { storiesOf } from '@storybook/react-native';

import View from '.';

import Text from 'sly/mobile/components/atoms/Text';

storiesOf('Atoms|View', module)
  .add('default', () => <View><Text>Welcome to Seniorly!</Text></View>);
