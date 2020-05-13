import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { size } from 'sly/web/components/themes';
import AgentSummary from 'sly/web/components/molecules/AgentSummary';
import LindaIwamota from 'sly/web/../private/storybook/sample-data/agent-linda-iwamota.json';

const Wrapper = styled.div`
  margin: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    width: ${size('mobileLayout.col4')};
    margin: ${size('spacing.large')} auto;
  }
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('tabletLayout.col8')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col8')};
  }
`;


const defaultProp = {
  agent: LindaIwamota,
};

storiesOf('Molecules|AgentSummary', module)
  .add('default', () => (
    <Wrapper>
      <AgentSummary {...defaultProp} />
    </Wrapper>
  ));
