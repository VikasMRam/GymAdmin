import React from 'react';
import { storiesOf } from '@storybook/react';

import PriceBar from 'sly/web/components/molecules/PriceBar';

const width = 75;
const price = 1200;

storiesOf('Molecules|PriceBar', module)
  .add('default', () => (
    <PriceBar width={width} price={price} />
  ))
  .add('with label', () => (
    <PriceBar width={width} price={price}>Assisted living within 20 miles</PriceBar>
  ))
  .add('with label, variation and palette', () => (
    <PriceBar width={width} price={price} palette="grey" variation="background">Assisted living within 20 miles</PriceBar>
  ));
