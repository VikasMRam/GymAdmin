import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Box from '.';

import Badge from 'sly/common/components/atoms/Badge';

storiesOf('Common|Atoms/Box', module)
  .add('default', () => <Box>test content</Box>)
  .add('non text content', () => (
    <Box>
      <Badge>New</Badge>
      test content
    </Box>
  ))
  .add('palette', () => <Box palette="secondary">test content</Box>)
  .add('padding', () => <Box padding="regular">test content</Box>)
  .add('no padding', () => <Box noPadding>test content</Box>)
  .add('shadow', () => <Box shadowBlur="regular">test content</Box>);
