import React from 'react';
import styled from 'styled-components';
import { string, func } from 'prop-types';


import Block from 'sly/components/atoms/Block/index';
import { size } from 'sly/components/themes/index';
import Button from 'sly/components/atoms/Button/index';

const Wrapper = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
    justify-content: space-between;
  }
`;

const TextSection = styled.div`

`;

const HeadingBlock = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
`;

const SubheadingBlock = styled(Block)`
  margin-bottom: ${size('spacing.large')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-bottom: initial;
  }
`;

const CommunityReviewsBottomSection = ({ communityName, onButtonClick }) => (
  <Wrapper>
    <TextSection>
      <HeadingBlock>{`Have experience with ${communityName}?`}</HeadingBlock>
      <SubheadingBlock size="caption" palette="grey">Your review can help other families with their senior living search.</SubheadingBlock>
    </TextSection>
    <Button ghost onClick={onButtonClick}> Write a review</Button>
  </Wrapper>
);

CommunityReviewsBottomSection.propTypes = {
  communityName: string.isRequired,
  onButtonClick: func,
};

export default CommunityReviewsBottomSection;
