import React from 'react';
import { storiesOf } from '@storybook/react';

import Label from 'sly/components/atoms/Label';

storiesOf('Atoms|Label', module)
  .add('default', () => <Label>Hello</Label>);
