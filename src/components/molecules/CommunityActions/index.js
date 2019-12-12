import React from 'react';
import styled from 'styled-components';
import { bool } from 'prop-types';

import GetCustomPricingButtonContainer from 'sly/containers/GetCustomPricingButtonContainer';

const GetPricingButton = styled(GetCustomPricingButtonContainer)`
    width: 100%;
  `;

const CommunityActions = ({ isAlreadyPricingRequested }) => {
  return (
    <GetPricingButton
      hasAlreadyRequestedPricing={isAlreadyPricingRequested}
      ghost={isAlreadyPricingRequested}
      kind="jumbo"
    >
      {isAlreadyPricingRequested ? 'Pricing requested' : 'Get Pricing'}
    </GetPricingButton>
  );
};

CommunityActions.propTypes = {
  isAlreadyPricingRequested: bool,
};

export default CommunityActions;
