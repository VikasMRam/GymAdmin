import React from 'react';
import { storiesOf } from '@storybook/react';

import Bar from 'sly/components/atoms/Bar';

storiesOf('Atoms|Bar', module)
  .add('default', () => (
    <Bar />
  ))
  .add('with palette', () => (
    <Bar palette="danger" />
  ))
  .add('with palette and variation', () => (
    <Bar palette="grey" variation="background" />
  ))
  .add('with width', () => (
    <Bar width={50} />
  ));
