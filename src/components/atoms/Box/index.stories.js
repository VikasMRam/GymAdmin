import React from 'react';
import { storiesOf } from '@storybook/react';

import Box from 'sly/components/atoms/Box';

storiesOf('Atoms|Box', module)
  .add('default', () => <Box>test content</Box>)
  .add('with palette', () => <Box palette="secondary">test content</Box>)
  .add('with padding', () => <Box padding="regular">test content</Box>);
