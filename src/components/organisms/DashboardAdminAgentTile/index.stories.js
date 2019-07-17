import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import DashboardAdminAgentTile from 'sly/components/organisms/DashboardAdminAgentTile';


import agent from 'sly/../private/storybook/sample-data/agent-linda-iwamota';

const Wrapper = 'div';

storiesOf('Organisms|DashboardAgentAdminTile', module)
  .add('default', () => (
    <Wrapper>
      <DashboardAdminAgentTile agent={agent} />
    </Wrapper>
  ))
  .add('recommended', () => (
    <Wrapper>
      <DashboardAdminAgentTile agent={agent} isRecommended />
    </Wrapper>
  )   );

