import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import Rhoda from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import { size } from 'sly/components/themes';
import CommunityFloorPlansList from 'sly/components/organisms/CommunityFloorPlansList';

const Box = styled.div`
  margin: ${size('spacing.xLarge')};
`;

const { propInfo, floorPlans } = Rhoda;
const { typeCare } = propInfo;
const typeOfCare = typeCare[0];

storiesOf('Organisms|CommunityFloorPlansList', module)
  .add('default', () => (
    <Box>
      <CommunityFloorPlansList typeOfCare={typeOfCare} floorPlans={floorPlans} />
    </Box>
  ));
