import React from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import { Block, Heading } from 'sly/components/atoms';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';

const TitleHeading = styled(Heading)`
  margin-bottom: ${size('spacing.regular')};
  font-weight: ${size('weight.regular')};
`;

const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const Wrapper = styled.div`
  background: ${palette('white', 'base')}E6;
  border-radius: ${size('border.xLarge')};
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
      <StyledBlock>Seniorly agents are local experts who can find homes that fit your care needs and budget</StyledBlock>
    </ContentWrapper>
    <StyledSearchBoxContainer layout="homeHero" onLocationSearch={onLocationSearch} />
  </Wrapper>
);

FindLocalAgent.propTypes = {
  onLocationSearch: func,
};

export default FindLocalAgent;
