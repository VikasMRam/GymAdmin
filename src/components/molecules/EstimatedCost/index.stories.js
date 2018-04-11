import React from 'react';
import { storiesOf } from '@storybook/react';
import EstimatedCost from '.';

const propertyName = 'Buena Vista Manor House';
const price = 1230;
const onGetDetailedPricingClicked = () => {
  alert('open booking modal');
};

storiesOf('Molecules|EstimatedCost', module)
  .add('default', () => (
    <EstimatedCost propertyName={propertyName} price={price} onGetDetailedPricingClicked={onGetDetailedPricingClicked} />
  ));
