import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import CommunityInfo from 'sly/web/components/molecules/CommunityInfo';
import RhodaGoldmanPlaza from 'sly/web/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const StyledCommunityInfo = styled(CommunityInfo)`
  background-color: black;
`;

storiesOf('Molecules|CommunityInfo', module)
  .add('default', () => <CommunityInfo community={RhodaGoldmanPlaza} />)
  .add('with showDescription', () => <CommunityInfo community={RhodaGoldmanPlaza} showDescription />)
  .add('with inverted', () => <StyledCommunityInfo community={RhodaGoldmanPlaza} inverted />)
  .add('with inverted and showDescription', () => <StyledCommunityInfo community={RhodaGoldmanPlaza} showDescription inverted />);

