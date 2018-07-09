import React from 'react';
import { storiesOf } from '@storybook/react';

import Box from '.';

storiesOf('Atoms|Box', module)
  .add('default', () => (<Box>test content</Box>));

storiesOf('Atoms|Box', module)
  .add('with palette', () => (<Box palette="secondary">test content</Box>));

storiesOf('Atoms|Box', module)
  .add('with padding', () => (<Box padding="regular">test content</Box>));
