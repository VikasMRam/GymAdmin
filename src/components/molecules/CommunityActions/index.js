import React from 'react';
import styled from 'styled-components';
import { func, bool } from 'prop-types';

import { size } from 'sly/components/themes';
import { Button } from 'sly/components/atoms/index';

const MainButton = styled(Button)`
  width: 100%;
  margin-bottom: ${size('spacing.large')};
`;
MainButton.displayName = 'MainButton';

const Wrapper = styled.div`
  display: flex;
`;

const CommunityActions = ({
  onSATClick, onGCPClick, isAlreadyTourScheduled, isAlreadyPricingRequested,
}) => (
  <div>
    {!isAlreadyPricingRequested &&
      <MainButton kind="jumbo" onClick={onGCPClick}>Get custom pricing</MainButton>}
    {isAlreadyPricingRequested &&
      <MainButton ghost kind="jumbo" onClick={onGCPClick}>Pricing requested</MainButton>}
    <Wrapper>
      <Button ghost onClick={onSATClick}>{isAlreadyTourScheduled ? 'Tour requested' : 'Book a Tour'}</Button>
    </Wrapper>
  </div>
);

CommunityActions.propTypes = {
  onSATClick: func,
  onGCPClick: func,
  isAlreadyTourScheduled: bool,
  isAlreadyPricingRequested: bool,
};

export default CommunityActions;
