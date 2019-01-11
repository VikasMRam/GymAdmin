import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import AgentSummary from 'sly/components/molecules/AgentSummary';
import { agents } from 'sly/constants/agents';

const agent = agents[0];

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
  agent: {
    info: {
      displayName: 'Stephen Anderson',
      profileImageUrl: agent.mainImage,
      numRatings: 15,
      aggregateRating: 3.53223232,
      recentFamiliesHelped: 20,
      citiesServed: ['Sausalito', 'Mill Valley', 'Tiburon', 'Belvedere', 'Corte Madera', 'Larkspur', 'Greenbrae', 'Kentfield', 'Ross', 'San Anselmo'],
      slyPhone: '9258312050',
    },
  },
  firstName: 'Stephen',
};

storiesOf('Molecules|AgentSummary', module)
  .add('default', () => (
    <Wrapper>
      <AgentSummary {...defaultProp} />
    </Wrapper>
  ));
