import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import EstimatedCost from '.';

const communityName = 'Buena Vista Manor House';
const price = 1230;
const onGetDetailedPricingClicked = () => {
  action('open booking modal');
};

storiesOf('Molecules|EstimatedCost', module)
  .add('default', () => (
    <EstimatedCost communityName={communityName} price={price} getDetailedPricing={onGetDetailedPricingClicked} />
  ));
