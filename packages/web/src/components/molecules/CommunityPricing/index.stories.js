import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityPricing from 'sly/web/components/molecules/CommunityPricing';

storiesOf('Molecules|CommunityPricing', module)
  .add('default', () => (
    <CommunityPricing price={4300} />
  ))
  .add('with description', () => (
    <CommunityPricing price={4300} description="Blah" />
  ));
