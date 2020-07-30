import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Text from '.';

storiesOf('Atoms|Text', module)
  .add('default', () => <Text>Welcome to Seniorly!</Text>);
