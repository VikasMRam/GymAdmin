import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import CommunityDetails from '.';

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
