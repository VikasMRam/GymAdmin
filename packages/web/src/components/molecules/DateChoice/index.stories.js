import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DateChoice from 'sly/web/components/molecules/DateChoice';

const from = '2018-1-1';
const to = '2018-1-20';

storiesOf('Molecules|DateChoice', module)
  .add('default', () => (
    <DateChoice from={from} to={to} onChange={action('Date selected')} />
  ))
  .add('with selected', () => (
    <DateChoice from={from} to={to} value={['2018-1-5']} onChange={action('Date selected')} />
  ))
  .add('with later date', () => (
    <DateChoice from={from} to={to} hasLaterDate onChange={action('Date selected')} />
  ));

