import React from 'react';
import styled from 'styled-components';
import { func, bool } from 'prop-types';

import { size } from 'sly/components/themes';
import { Button } from 'sly/components/atoms/index';

const BookATourButton = styled(Button)`
  display: none;
  width: 100%;
  margin-bottom: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;
  }
`;
BookATourButton.displayName = 'BookATourButton';

const AskQuestionButton = styled(Button)`
  display: none;
  width: 100%;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;
  }
`;
AskQuestionButton.displayName = 'AskQuestionButton';

const GetCustomPriceButton = styled(Button)`
  display: block;
  width: 100%;
  margin-bottom: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none; 
  }
`;
GetCustomPriceButton.displayName = 'GetCustomPriceButton';

const BookATourFooterButton = styled(Button)`
  width: 100%;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;
BookATourFooterButton.displayName = 'BookATourFooterButton';

const CommunityActions = ({
  onBookATourClick, onGCPClick, onAQClick, isAlreadyTourScheduled, isAlreadyPricingRequested,
}) => (
  <div>
    <BookATourButton isAlreadyTourScheduled={isAlreadyTourScheduled} kind="jumbo" onClick={onBookATourClick}>
      {isAlreadyTourScheduled ? 'Tour requested' : 'Book a Tour'}
    </BookATourButton>
    <AskQuestionButton ghost kind="jumbo" onClick={onAQClick}>
      Ask a question
    </AskQuestionButton>
    <GetCustomPriceButton kind="jumbo" onClick={onGCPClick}>
      {isAlreadyPricingRequested ? 'Pricing requested' : 'Get custom pricing'}
    </GetCustomPriceButton>
    <BookATourFooterButton ghost kind="jumbo" onClick={onBookATourClick}>
      {isAlreadyTourScheduled ? 'Tour requested' : 'Book a Tour'}
    </BookATourFooterButton>
  </div>
);

CommunityActions.propTypes = {
  onBookATourClick: func,
  onGCPClick: func,
  onAQClick: func,
  isAlreadyTourScheduled: bool,
  isAlreadyPricingRequested: bool,
};

export default CommunityActions;
