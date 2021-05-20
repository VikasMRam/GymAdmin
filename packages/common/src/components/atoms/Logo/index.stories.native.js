import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Logo from '.';

storiesOf('Common|Atoms/Logo', module)
  .add('default', () => <Logo />)
  .add('palette', () => <Logo palette="danger" />);
