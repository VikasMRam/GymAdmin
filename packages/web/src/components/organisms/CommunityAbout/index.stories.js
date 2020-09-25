import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityAbout from 'sly/web/components/organisms/CommunityAbout';
import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';


const {
  name, propInfo,
} = RhodaGoldmanPlaza;
const {
  communityDescription, staffDescription, residentDescription,
} = propInfo;

storiesOf('Organisms|CommunityAbout', module)
  .add('onlyNameCommunityDescription', () => (
    <CommunityAbout
      communityName={name}
      communityDescription={communityDescription}
    />
  ))
  .add('onlyName,CommunityDescriptionAndStaffDescription', () => (
    <CommunityAbout
      communityName={name}
      communityDescription={communityDescription}
      staffDescription={staffDescription}
    />
  ))
  .add('allProperties', () => (
    <CommunityAbout
      communityName={name}
      communityDescription={communityDescription}
      staffDescription={staffDescription}
      residentDescription={residentDescription}
    />
  ))
  .add('onlyName', () => <CommunityAbout communityName={name} />);
