import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '.';

storiesOf('Atoms|Box', module)
    .add('default', () => (<Box>test content</Box>));
