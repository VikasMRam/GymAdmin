import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityPricingAndRating from 'sly/components/molecules/CommunityPricingAndRating';

storiesOf('Molecules|CommunityPricingAndRating', module)
  .add('default', () => (
    <CommunityPricingAndRating price={4300} rating={3.6} />
  ))
  .add('with Description', () => (
    <CommunityPricingAndRating price={4300} rating={3.6} priceDescription="Blah" />
  ));
