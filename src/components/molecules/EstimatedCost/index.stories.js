import React from 'react';
import { storiesOf } from '@storybook/react';
import EstimatedCost from '.';

const communityName = 'Buena Vista Manor House';
const price = 1230;
const onGetDetailedPricingClicked = () => {
  alert('open booking modal');
};

storiesOf('Molecules|EstimatedCost', module)
  .add('default', () => (
    <EstimatedCost communityName={communityName} price={price} onGetDetailedPricingClicked={onGetDetailedPricingClicked} />
  ));
