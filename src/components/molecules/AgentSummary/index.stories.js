import React from 'react';
import { storiesOf } from '@storybook/react';

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
  slyPhone: 9258312050,
};

storiesOf('Molecules|AgentSummary', module)
  .add('default', () => <AgentSummary {...defaultProp} />);
