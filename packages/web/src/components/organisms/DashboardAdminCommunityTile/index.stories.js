import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import DashboardAdminCommunityTile from 'sly/web/components/organisms/DashboardAdminCommunityTile';
import community from 'sly/storybook/sample-data/admin-property-rhoda-goldman-plaza.json';

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
    community.propInfo.hasContract = false;
    community.propInfo.lastViewedAt = null;
    return wrap({ community });
  })
  .add('hasContract', () => {
    community.propInfo.hasContract = true;
    return wrap({ community });
  })
  .add('lastSeen', () => {
    community.propInfo.hasContract = true;
    community.propInfo.lastViewedAt = (new Date()).toISOString();
    return wrap({ community });
  });

