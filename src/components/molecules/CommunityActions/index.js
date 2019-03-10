import React from 'react';
import styled from 'styled-components';
import { func, bool } from 'prop-types';

import { size } from 'sly/components/themes';
import { Button } from 'sly/components/atoms/index';

const MainButton = styled(Button)`
  width: 100%;
`;
MainButton.displayName = 'MainButton';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: ${size('spacing.regular')};
`;

// TODO: clarify whether to modify in atom
const StyledButton = styled(Button)`
  font-size: ${size('text.caption')};
`;

const CommunityActions = ({
  onBookATourClick, onGCPClick, onAQClick, isAlreadyTourScheduled, isAlreadyPricingRequested,
}) => (
  <div>
    {!isAlreadyPricingRequested &&
    <MainButton kind="jumbo" onClick={onGCPClick}>Get custom pricing</MainButton>}
    {isAlreadyPricingRequested &&
    <MainButton ghost kind="jumbo" onClick={onGCPClick}>Pricing requested</MainButton>}
    {/* <Wrapper> */}
    {/* <StyledButton ghost onClick={onAQClick}>Ask a question</StyledButton> */}
    {/* <StyledButton ghost onClick={onBookATourClick}>{isAlreadyTourScheduled ? 'Tour requested' : 'Book a Tour'}</StyledButton> */}
    {/* </Wrapper> */}
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
