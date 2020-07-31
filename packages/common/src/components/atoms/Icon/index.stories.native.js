import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Icon from '.';

storiesOf('Common|Atoms/Icon', module)
  .add('default', () => <Icon icon="account" />);
