import React from 'react';
import styled from 'styled-components';
import { func, bool } from 'prop-types';

import { Button } from 'sly/components/atoms/index';
import { Experiment } from 'sly/services/experiments/components/Experiment';
import Variant from 'sly/services/experiments/components/Variant';

const MainButton = styled(Button)`
  width: 100%;
`;
MainButton.displayName = 'MainButton';


const CommunityActions = ({ onGCPClick, isAlreadyPricingRequested }) => (
  <div>
    <Experiment name="Molecules_CommunityActions" defaultVariant="wizard">
      <Variant name="wizard">
        {!isAlreadyPricingRequested &&
        <MainButton kind="jumbo" onClick={onGCPClick}>Get Pricing</MainButton>}
        {isAlreadyPricingRequested &&
        <MainButton ghost kind="jumbo" onClick={onGCPClick}>Pricing requested</MainButton>}
      </Variant>
      <Variant name="phone">
        <MainButton kind="jumbo" href="tel:+18558664515">Call Now for Pricing</MainButton>
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
