import React from 'react';
import { storiesOf } from '@storybook/react';

import PlusBadge from '.';

storiesOf('Molecules|PlusBadge', module)
  .add('default', () => <PlusBadge />)
  .add('fullWidth', () => <PlusBadge fullWidth />)
  .add('plusCategory', () => <PlusBadge plusCategory="best value" />);
