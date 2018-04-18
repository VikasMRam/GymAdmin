import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from '.';

storiesOf('Molecules|Checkbox', module)
  .add('checked', () => <Checkbox checked />)
  .add('default (unchecked)', () => <Checkbox />);
