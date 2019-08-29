import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import DashboardAdminReferralCommunityTile from 'sly/components/organisms/DashboardAdminReferralCommunityTile';
import community from 'sly/../private/storybook/sample-data/admin-property-rhoda-goldman-plaza.json';

const Wrapper = styled.div`
  width: 800px;
  padding: 24px;
`;


const wrap = (props = {}) => (
  <Wrapper>
    <DashboardAdminReferralCommunityTile
      {...props}
    />
  </Wrapper>
);

storiesOf('Organisms|DashboardAdminReferralCommunityTile', module)
  .add('default', () => {
    community.propInfo.hasContract = false;
    community.propInfo.lastViewedAt = null;
    return wrap({ community });
  })
  .add('hasContract', () => {
    community.propInfo.hasContract = true;
    return wrap({ community });
  })
  .add('with referralSentAt', () => {
    community.propInfo.hasContract = true;
    const referralSentAt = (new Date()).toISOString();
    return wrap({ community, referralSentAt });
  });

