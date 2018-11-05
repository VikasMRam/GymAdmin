import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityPricing from 'sly/components/molecules/CommunityPricing';

storiesOf('Molecules|CommunityPricing', module)
  .add('default', () => (
    <CommunityPricing />
  ))
  .add('with Price', () => (
    <CommunityPricing price={4300} />
  ));
