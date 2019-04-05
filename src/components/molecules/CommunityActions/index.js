import React from 'react';
import styled from 'styled-components';
import { func, bool } from 'prop-types';

import { Button } from 'sly/components/atoms/index';
import { Experiment, Variant } from 'sly/services/experiments';


const MainButton = styled(Button)`
  width: 100%;
`;
MainButton.displayName = 'MainButton';


const CommunityActions = ({ onGCPClick, isAlreadyPricingRequested }) => (
  <div>
    <Experiment name="Molecules_CommunityActions" defaultVariant="wizard">
      <Variant name="phone">
        <MainButton kind="jumbo" href="tel:+18558664515">Call Now for Pricing</MainButton>
      </Variant>
      <Variant name="wizard">
        {!isAlreadyPricingRequested &&
        <MainButton kind="jumbo" onClick={onGCPClick}>Get Pricing</MainButton>}
        {isAlreadyPricingRequested &&
        <MainButton ghost kind="jumbo" onClick={onGCPClick}>Pricing requested</MainButton>}
      </Variant>
    </Experiment>

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
