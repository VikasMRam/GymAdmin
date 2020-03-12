import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import CommunityPricingTable from 'sly/components/organisms/CommunityPricingTable';

const Box = styled.div`
  margin: ${size('spacing.xLarge')};
`;

const pricesList = [
  { label: 'Private Suite', value: 3000, currency: 'USD' },
  { label: 'Shared Suite', value: 3000, currency: 'USD' },
  { label: 'One Bedroom Apartment', value: 3000, currency: 'USD' },
  { label: 'Two Bedroom Apartment', value: 4000, currency: 'USD' },
];

storiesOf('Organisms|CommunityPricingTable', module)
  .add('default', () => (
    <Box>
      <CommunityPricingTable pricesList={pricesList} price={3000} />
    </Box>
  ))
  .add('with estimatedPriceList', () => (
    <Box>
      <CommunityPricingTable pricesList={[]} estimatedPriceList={pricesList} price={3000} />
    </Box>
  ));
