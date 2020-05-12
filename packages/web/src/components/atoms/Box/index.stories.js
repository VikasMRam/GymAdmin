import React from 'react';
import { storiesOf } from '@storybook/react';

import Box from 'sly/web/components/atoms/Box';
import shadow from 'sly/web/components/helpers/shadow';

const ShadowBox = shadow(Box);

storiesOf('Atoms|Box', module)
  .add('default', () => <Box>test content</Box>)
  .add('with palette', () => <Box palette="secondary">test content</Box>)
  .add('with padding', () => <Box padding="regular">test content</Box>)
  .add('with no padding', () => <Box noPadding>test content</Box>)
  .add('with shadow', () => <ShadowBox>test content</ShadowBox>);
