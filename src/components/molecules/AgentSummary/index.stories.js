import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import AgentSummary from 'sly/components/molecules/AgentSummary';

const agent = {
  id: 'oasis-denver-metro-daphne-jean-and-lisa-theard',
  name: 'Oasis Denver Metro, CO (Daphne Jean and Lisa Theard)',
  agentBio: 'Daphne Jean and Lisa Theard understand the emotional struggles, financial pressures and other difficulties involved when deciding whether to move a loved one from their home to the safety of a community, whether that be independent or assisted living or more involved care, such as long-term and memory care locations.  Daphne was raised in Atlanta, Georgia and moved to St. Louis, Missouri after college.  Her passion for community service led her to the Greater St. Louis Literacy Council as a volunteer instructor. Lisa was born in New Jersey and moved to Colorado when her father retired from the military. While she was working in corporate America, her dad suffered a stroke and was diagnosed with Alzheimer’s Disease. From then on, Lisa became heavily involved in his care and the complexities that came with it. They are here to help you through, step by step. Daphne Jean and Lisa Theard partnered with Seniorly in 2018.',
  mainImage: 'https://d1qiigpe5txw4q.cloudfront.net/uploads/99ae88dbcd4cef84ec2027c7bbfdbb38/OasisDenver_Seniorly_sd.png',
  status: 1,
  address: {
    id: '3ce07ca40c7c180111e32804c9ac7009',
    city: 'Denver',
    state: 'CO',
  },
  user: {
    id: '2a03b285d134958535f724dfec8fca7b',
    name: 'Daphne Jean And Lisa Theard',
  },
};

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
