import React from 'react';
import { storiesOf } from '@storybook/react';

import Badge from 'sly/components/atoms/Badge';

storiesOf('Atoms|Badge', module)
  .add('default', () => <Badge>New</Badge>)
  .add('with palette', () => <Badge palette="danger" textPalette="white">New</Badge>);
