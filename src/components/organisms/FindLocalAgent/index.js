import React from 'react';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { Heading, Block } from 'sly/components/atoms';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';

const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const Wrapper = styled.div`
  background: ${palette('white', 'base')}E6;
  padding: ${size('spacing.xxxLarge')};
  border-radius: ${size('border.xLarge')};
`;

const ContentWrapper = styled.div`
  margin: auto;
  text-align: center;
`;

const StyledSearchBoxContainer = styled(SearchBoxContainer)`
  max-width: ${size('layout.col6')};
  margin: auto;
`;

const FindLocalAgent = () => (
  <Wrapper>
    <ContentWrapper>
      <Heading>Find your local senior living agent</Heading>
      <StyledBlock>Seniorly agents are local experts who can find homes that fit your care needs and budget</StyledBlock>
    </ContentWrapper>
    <StyledSearchBoxContainer layout="homeHero" />
  </Wrapper>
);

export default FindLocalAgent;
