import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import Rhoda from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import { size } from 'sly/components/themes';
import CommunityPricingTable from 'sly/components/organisms/CommunityPricingTable';

const Box = styled.div`
  margin: ${size('spacing.xLarge')};
`;

const { propInfo, floorPlans } = Rhoda;
const { typeCare } = propInfo;
const typeOfCare = typeCare[0];
const pricesList = [
  { label: 'Private Suite', value: 3000, currency: 'USD' },
  { label: 'Shared Suite', value: 3000, currency: 'USD' },
  { label: 'One Bedroom Apartment', value: 3000, currency: 'USD' },
  { label: 'Two Bedroom Apartment', value: 4000, currency: 'USD' },
];

storiesOf('Organisms|CommunityPricingTable', module)
  .add('default', () => (
    <Box>
      <CommunityPricingTable pricesList={pricesList} />
    </Box>
  ));
