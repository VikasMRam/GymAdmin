import React from 'react';
import styled from 'styled-components';
import { bool, string } from 'prop-types';

import GetCustomPricingButtonContainer from 'sly/web/containers/GetCustomPricingButtonContainer';

const GetPricingButton = styled(GetCustomPricingButtonContainer)`
    width: 100%;
  `;

const CommunityActions = ({ isAlreadyPricingRequested, locTrack }) => {
  return (
    <GetPricingButton
      hasAlreadyRequestedPricing={isAlreadyPricingRequested}
      locTrack={locTrack}
      ghost={isAlreadyPricingRequested}
      kind="jumbo"
    >
      {isAlreadyPricingRequested ? 'Pricing requested' : 'Get Pricing'}
    </GetPricingButton>
  );
};

CommunityActions.propTypes = {
  isAlreadyPricingRequested: bool,
  locTrack: string,
};

export default CommunityActions;
