import React from 'react';
import { storiesOf } from '@storybook/react';
import PriceBar from '.';

const width = 75;
const price = 1200;

storiesOf('Molecules|PriceBar', module)
  .add('default', () => (
    <PriceBar width={width} price={price} />
  ));
