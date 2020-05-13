import React from 'react';
import { storiesOf } from '@storybook/react';

import GetCommunityPricingAndAvailability from 'sly/web/components/organisms/GetCommunityPricingAndAvailability';
import RhodaGoldmanPlaza from 'sly/web/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

storiesOf('Organisms|GetCommunityPricingAndAvailability', module)
  .add('default', () => <GetCommunityPricingAndAvailability community={RhodaGoldmanPlaza} />);
