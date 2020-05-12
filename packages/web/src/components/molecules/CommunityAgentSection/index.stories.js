import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityAgentSection from 'sly/web/components/molecules/CommunityAgentSection';
import CollapsibleSection from 'sly/web/components/molecules/CollapsibleSection';
import LindaIwamota from 'sly/web/../private/storybook/sample-data/agent-linda-iwamota.json';

storiesOf('Molecules|CommunityAgentSection', module)
  .add('default', () => (
    <CommunityAgentSection agent={LindaIwamota} />
  ))
  .add('within Collapsible Section', () => (
    <CollapsibleSection title="Compare to other communities in the area">
      <CommunityAgentSection agent={LindaIwamota} />
    </CollapsibleSection>
  ));
