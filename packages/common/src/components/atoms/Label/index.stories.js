import React from 'react';
import { storiesOf } from '@storybook/react';

import Label from '.';

storiesOf('Common|Atoms/Label', module)
  .add('default', () => <Label>Hello</Label>);
