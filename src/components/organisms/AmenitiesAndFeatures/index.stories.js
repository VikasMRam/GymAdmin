import React from 'react';
import { storiesOf } from '@storybook/react';

import AmenitiesAndFeatures from 'sly/components/organisms/AmenitiesAndFeatures';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';


const { name, propInfo } = RhodaGoldmanPlaza;
const {
  personalSpaceOther, communitySpaceOther, nonCareServicesOther, languagesOther,
} = propInfo;
let {
  communityHighlights, personalSpace, communitySpace,
  nonCareServices, languages,
} = propInfo;

communityHighlights = communityHighlights || [];
personalSpace = personalSpace || [];
communitySpace = communitySpace || [];
nonCareServices = nonCareServices || [];
languages = languages || [];

storiesOf('Organisms|AmenitiesAndFeatures', module)
  .add('default', () => (
    <AmenitiesAndFeatures
      communityName={name}
      communityHighlights={communityHighlights}
      personalSpace={personalSpace}
      personalSpaceOther={personalSpaceOther}
      communitySpace={communitySpace}
      communitySpaceOther={communitySpaceOther}
      nonCareServices={nonCareServices}
      nonCareServicesOther={nonCareServicesOther}
      languages={languages}
      languagesOther={languagesOther}
    />
  ))
  .add('no data', () => (
    <AmenitiesAndFeatures
      communityName={name}
    />
  ));
