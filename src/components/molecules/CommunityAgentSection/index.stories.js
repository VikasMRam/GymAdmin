import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityAgentSection from 'sly/components/molecules/CommunityAgentSection';
import CollapsibleSection from 'sly/components/molecules/CollapsibleSection';

const agent = {
  id: 'golden-placement-services-ca-lidia-parman-',
  address: {
    city: 'Menifee',
    county: 'Riverside',
    latitude: 33.6831035,
    line1: '30141 Antelope Road #D-127',
    line2: '',
    longitude: -117.1700328,
    state: 'CA',
    zip: '92584',
  },
  info: {
    displayName: 'Rachel Wasserstrom',
    slyPhone: '9258906575',
    email: 'rachelwassertrom@seniorly.com',
    profileImageUrl: 'https://avatars.githubusercontent.com/u/113003',
    chosenReview: 'Working with Rachel has been a huge help. She knew exactly which communities had the care services my father needed and helped us schedule tours with several communities.',
  },
};

storiesOf('Molecules|CommunityAgentSection', module)
  .add('default', () => (
    <CommunityAgentSection agent={agent} />
  ))
  .add('within Collapsible Section', () => (
    <CollapsibleSection title="Compare to other communities in the area">
      <CommunityAgentSection agent={agent} />
    </CollapsibleSection>
  ));
