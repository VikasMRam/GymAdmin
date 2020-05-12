import React from 'react';
import { storiesOf } from '@storybook/react';

import GetCommunityPricingAndAvailability from 'sly/components/organisms/GetCommunityPricingAndAvailability';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

storiesOf('Organisms|GetCommunityPricingAndAvailability', module)
  .add('default', () => <GetCommunityPricingAndAvailability community={RhodaGoldmanPlaza} />);
