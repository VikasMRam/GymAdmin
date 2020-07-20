import React from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';

import { size, palette } from 'sly/common/components/themes';
import { Block, Heading } from 'sly/web/components/atoms';
import SearchBoxContainer from 'sly/web/containers/SearchBoxContainer';

const TitleHeading = styled(Heading)`
  margin-bottom: ${size('spacing.regular')};
  font-weight: ${size('weight.regular')};
`;

const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const Wrapper = styled.div`
  background: ${palette('white', 'base')}E6;
  border-radius: ${size('spacing.small')};
  padding: ${size('spacing.xxxLarge')};
  width: 100%;
`;

const ContentWrapper = styled.div`
  margin: auto;
  text-align: center;
`;

const StyledSearchBoxContainer = styled(SearchBoxContainer)`
  max-width: ${size('layout.col6')};
  margin: auto;
`;

const FindLocalAgent = ({ onLocationSearch }) => (
  <Wrapper>
    <ContentWrapper>
      <TitleHeading level="hero" size="hero">Find your local senior living agent</TitleHeading>
      <StyledBlock>Our local experts can help you find the perfect living arrangement. Work with one of our senior living agents to find the perfect home for mom or dad</StyledBlock>
    </ContentWrapper>
    <StyledSearchBoxContainer layout="homeHero" onLocationSearch={onLocationSearch} />
  </Wrapper>
);

FindLocalAgent.propTypes = {
  onLocationSearch: func,
};

export default FindLocalAgent;
