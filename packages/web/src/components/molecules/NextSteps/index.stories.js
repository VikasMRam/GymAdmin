import React from 'react';
import { storiesOf } from '@storybook/react';

import NextSteps from '.';

storiesOf('NextSteps', module)
  .add('default', () => <NextSteps label="test" links={[{ to: '/test', title: 'text' }, { to: '/temp', title: 'temp' }]} toc="assisted-living" />);
