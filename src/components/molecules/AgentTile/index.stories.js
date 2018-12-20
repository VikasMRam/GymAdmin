import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import AgentTile from 'sly/components/molecules/AgentTile';
import { size } from 'sly/components/themes';

const Wrapper = styled.div`
  width: ${size('layout.col4')};
  margin: ${size('spacing.large')};
`;

const address = {
  city: 'San Anselmo',
  state: 'CA',
};

const aggregateRating = {
  ratingValue: 4.5,
  numRatings: 14,
};

const agentInfo = {
  displayName: 'Fonz Wasserstrom',
  slyPhone: '9258906575',
  recentFamilies: 17,
  profileImgUrl: 'https://avatars.githubusercontent.com/u/113003',
  citiesServed: ['Utah', 'Calcuta'],
};

export const agent = {
  url: '/agents/midwest/fonz-wasserstrom',
  address,
  aggregateRating,
  agentInfo,
};

storiesOf('Molecules|AgentTile', module)
  .add('default', () => (
    <Wrapper>
      <AgentTile agent={agent} />
    </Wrapper>
  ));
