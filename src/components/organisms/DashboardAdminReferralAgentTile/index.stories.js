import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DashboardAdminReferralAgentTile from 'sly/components/organisms/DashboardAdminReferralAgentTile';
import agent from 'sly/../private/storybook/sample-data/agent-linda-iwamota';

const Wrapper = styled.div`
  width: 800px;
  padding: 24px;
`;

const notifyError = action('notifyError');
const notifyInfo = action('notifyInfo');

const wrap = (props = {}) => (
  <Wrapper>
    <DashboardAdminReferralAgentTile
      agent={agent}
      notifyInfo={notifyInfo}
      notifyError={notifyError}
      {...props}
    />
  </Wrapper>
);

storiesOf('Organisms|DashboardAdminReferralAgentTile', module)
  .add('default', () => wrap())
  .add('recommended', () => wrap({ isRecommended: true }));

