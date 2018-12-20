import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { size } from 'sly/components/themes/index';
import AgentSummary from 'sly/components/molecules/AgentSummary';
import { agents } from 'sly/services/helpers/agents';

const agent = agents[0];

const defaultProp = {
  displayName: 'Stephen Anderson',
  profileImageUrl: agent.mainImage,
  numRatings: 15,
  aggregateRating: 3.53223232,
  recentFamiliesHelped: 20,
  citiesServed: ['Sausalito', 'Mill Valley', 'Tiburon', 'Belvedere', 'Corte Madera', 'Larkspur', 'Greenbrae', 'Kentfield', 'Ross', 'San Anselmo'],
  slyPhone: '925-831-2050',
};

const MobileWrapper = styled.div`
  width: ${size('mobileLayout.col4')};
  margin: 0 auto;
`;


storiesOf('Molecules|AgentSummary', module)
  .add('default', () => <AgentSummary {...defaultProp} />)
  .add('mobile', () => <MobileWrapper><AgentSummary {...defaultProp} /></MobileWrapper>);
