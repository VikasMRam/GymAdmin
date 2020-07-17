import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import AgentTile from 'sly/web/components/molecules/AgentTile';
import { size } from 'sly/web/components/themes';
import LindaIwamota from 'sly/storybook/sample-data/agent-linda-iwamota.json';

const Wrapper = styled.div`
  width: ${size('layout.col4')};
  margin: ${size('spacing.large')};
`;

storiesOf('Molecules|AgentTile', module)
  .add('default', () => (
    <Wrapper>
      <AgentTile agent={LindaIwamota} />
    </Wrapper>
  ));
