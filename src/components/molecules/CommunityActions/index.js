import React, { Fragment } from 'react';
import styled from 'styled-components';
import { func, bool } from 'prop-types';

import { Button } from 'sly/components/atoms/index';


const MainButton = styled(Button)`
  width: 100%;
`;
MainButton.displayName = 'MainButton';


const CommunityActions = ({ onGCPClick, isAlreadyPricingRequested }) => (
  <Fragment>
    {!isAlreadyPricingRequested &&
    <MainButton kind="jumbo" onClick={onGCPClick}>Get Pricing</MainButton>}
    {isAlreadyPricingRequested &&
    <MainButton ghost kind="jumbo" onClick={onGCPClick}>Pricing requested</MainButton>}
  </Fragment>
);

CommunityActions.propTypes = {
  onBookATourClick: func,
  onGCPClick: func,
  onAQClick: func,
  isAlreadyTourScheduled: bool,
  isAlreadyPricingRequested: bool,
};

export default CommunityActions;
