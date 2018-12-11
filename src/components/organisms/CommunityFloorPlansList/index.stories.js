import React from 'react';
import { storiesOf } from '@storybook/react';

import Rhoda from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import CommunityFloorPlansList from 'sly/components/organisms/CommunityFloorPlansList';

const { propInfo, floorPlans } = Rhoda;
const { typeCare } = propInfo;
const typeOfCare = typeCare[0];

storiesOf('Organisms|CommunityFloorPlansList', module)
  .add('default', () => (<CommunityFloorPlansList typeOfCare={typeOfCare} floorPlans={floorPlans} />));
