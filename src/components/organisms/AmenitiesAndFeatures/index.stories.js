import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import AmenitiesAndFeatures from '.';

const { name, propInfo } = RhodaGoldmanPlaza;
let {
  communityHighlights, personalSpace, personalSpaceOther, communitySpace, communitySpaceOther,
  nonCareServices, nonCareServicesOther, languages, languagesOther,
} = propInfo;

communityHighlights = communityHighlights || [];
personalSpace = personalSpace || [];
personalSpaceOther = personalSpaceOther || [];
communitySpace = communitySpace || [];
communitySpaceOther = communitySpaceOther || [];
nonCareServices = nonCareServices || [];
nonCareServicesOther = nonCareServicesOther || [];
languages = languages || [];
languagesOther = languagesOther || [];

storiesOf('Organisms|AmenitiesAndFeatures', module)
  .add('default', () => (
    <AmenitiesAndFeatures
      propertyName={name}
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
      propertyName={name}
    />
  ));
