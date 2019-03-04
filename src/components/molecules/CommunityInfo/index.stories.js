import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import CommunityInfo from 'sly/components/molecules/CommunityInfo';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const StyledCommunityInfo = styled(CommunityInfo)`
  background-color: black;
`;

storiesOf('Molecules|CommunityInfo', module)
  .add('default', () => <CommunityInfo community={RhodaGoldmanPlaza} />)
  .add('with inverted', () => <StyledCommunityInfo community={RhodaGoldmanPlaza} inverted />);
