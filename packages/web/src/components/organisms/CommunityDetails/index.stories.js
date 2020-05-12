import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityDetails from 'sly/web/components/organisms/CommunityDetails';
import RhodaGoldmanPlaza from 'sly/web/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';


const {
  name, propInfo,
} = RhodaGoldmanPlaza;
const {
  communityDescription, staffDescription, residentDescription,
} = propInfo;

storiesOf('Organisms|CommunityDetails', module)
  .add('onlyNameCommunityDescription', () => (
    <CommunityDetails
      communityName={name}
      communityDescription={communityDescription}
    />
  ))
  .add('onlyName,CommunityDescriptionAndStaffDescription', () => (
    <CommunityDetails
      communityName={name}
      communityDescription={communityDescription}
      staffDescription={staffDescription}
    />
  ))
  .add('allProperties', () => (
    <CommunityDetails
      communityName={name}
      communityDescription={communityDescription}
      staffDescription={staffDescription}
      residentDescription={residentDescription}
    />
  ))
  .add('onlyName', () => <CommunityDetails communityName={name} />);
