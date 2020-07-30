import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DashboardAdminAgentTile from 'sly/web/components/organisms/DashboardAdminAgentTile';
import agent from 'sly/storybook/sample-data/agent-linda-iwamota.json';

const Wrapper = styled.div`
  width: 800px;
  padding: 24px;
`;

const notifyError = action('notifyError');
const notifyInfo = action('notifyInfo');

const wrap = (props = {}) => (
  <Wrapper>
    <DashboardAdminAgentTile
      agent={agent}
      notifyInfo={notifyInfo}
      notifyError={notifyError}
      {...props}
    />
  </Wrapper>
);

storiesOf('Organisms|DashboardAdminAgentTile', module)
  .add('default', () => wrap())
  .add('recommended', () => wrap({ isRecommended: true }));

