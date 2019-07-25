import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DashboardAdminCommunityTile from 'sly/components/organisms/DashboardAdminCommunityTile';
import community from 'sly/../private/storybook/sample-data/admin-property-rhoda-goldman-plaza';

const Wrapper = styled.div`
  width: 800px;
  padding: 24px;
`;


const wrap = (props = {}) => (
  <Wrapper>
    <DashboardAdminCommunityTile
      {...props}
    />
  </Wrapper>
);

storiesOf('Organisms|DashboardAdminCommunityTile', module)
  .add('default', () => {
    community.adminInfo.hasContract = false;
    community.adminInfo.lastViewedAt = null;
    return wrap({ community });
  })
  .add('hasContract', () => {
    community.adminInfo.hasContract = true;
    return wrap({ community });
  })
  .add('lastSeen', () => {
    community.adminInfo.hasContract = true;
    community.adminInfo.lastViewedAt = (new Date()).toISOString();
    return wrap({ community });
  });

