import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import DashboardAdminCommunityAgentList from 'sly/web/components/organisms/DashboardAdminCommunityAgentList';
import communityWithAgents from 'sly/web/../private/storybook/sample-data/admin-property-rhoda-goldman-plaza';

const Wrapper = styled.div`
  width: 800px;
  padding: 24px;
`;


const wrap = (props = {}) => (
  <Wrapper>
    <DashboardAdminCommunityAgentList
      {...props}
    />
  </Wrapper>
);

storiesOf('Organisms|DashboardAdminCommunityAgentList', module)
  .add('default', () => {
    communityWithAgents.adminInfo.hasContract = false;
    communityWithAgents.adminInfo.lastViewedAt = null;
    return wrap({ communitiesWithAgents: [communityWithAgents] });
  })
  .add('WithMultiple', () => {
    const myList = [communityWithAgents, communityWithAgents];
    communityWithAgents.adminInfo.hasContract = true;
    return wrap({ communitiesWithAgents: myList });
  })
  .add('lastSeen', () => {
    communityWithAgents.adminInfo.hasContract = true;
    communityWithAgents.adminInfo.lastViewedAt = (new Date()).toISOString();
    return wrap({ communitiesWithAgents: [communityWithAgents] });
  });

