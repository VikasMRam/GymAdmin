import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import EstimatedCost from '.';

const communityName = 'Buena Vista Manor House';
const price = 1230;

storiesOf('Molecules|EstimatedCost', module)
  .add('default', () => (
    <EstimatedCost communityName={communityName} price={price} getDetailedPricing={action('open booking modal')} />
  ));
