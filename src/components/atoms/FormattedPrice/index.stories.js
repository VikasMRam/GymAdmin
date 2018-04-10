import React from 'react';
import { storiesOf } from '@storybook/react';
import FormattedPrice from '.';

storiesOf('Atoms|FormattedPrice', module)
  .add('default', () => (
    <FormattedPrice price={2300} />
  ))
  .add('5 digits', () => (
    <FormattedPrice price={23100} />
  ))
  .add('6 digits', () => (
    <FormattedPrice price={323100} />
  ));
