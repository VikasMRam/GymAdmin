import React from 'react';
import styled from 'styled-components';
import { bool, string } from 'prop-types';

import { size } from 'sly/common/components/themes';
import GetCustomPricingButtonContainer from 'sly/web/containers/GetCustomPricingButtonContainer';

const GetPricingButton = styled(GetCustomPricingButtonContainer)`
    width: 100%;
    margin-left: ${size('spacing.large')}
  `;

const CommunityActions = ({ isAlreadyPricingRequested, locTrack, ...props }) => {
  return (
    <GetPricingButton
      hasAlreadyRequestedPricing={isAlreadyPricingRequested}
      locTrack={locTrack}
      ghost={isAlreadyPricingRequested}
      {...props}
    >
      {isAlreadyPricingRequested ? 'Pricing requested' : 'Get Detailed Pricing'}
    </GetPricingButton>
  );
};

CommunityActions.propTypes = {
  isAlreadyPricingRequested: bool,
  locTrack: string,
};

export default CommunityActions;
