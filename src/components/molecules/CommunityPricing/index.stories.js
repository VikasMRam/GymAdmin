import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityPricing from 'sly/components/molecules/CommunityPricing';

storiesOf('Molecules|CommunityPricing', module)
  .add('default', () => (
    <CommunityPricing price={4300} />
  ));
