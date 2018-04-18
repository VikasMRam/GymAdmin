import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from '.';

storiesOf('Atoms|Checkbox', module)
  .add('checked', () => <Checkbox checked />)
  .add('default (unchecked)', () => <Checkbox />);
