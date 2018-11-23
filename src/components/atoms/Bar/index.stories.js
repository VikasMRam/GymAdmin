import React from 'react';
import { storiesOf } from '@storybook/react';

import Bar from 'sly/components/atoms/Bar';

storiesOf('Atoms|Bar', module)
  .add('default', () => (
    <Bar />
  ))
  .add('withPalette', () => (
    <Bar palette="danger" />
  ))
  .add('50%Width', () => (
    <Bar width={50} />
  ));
