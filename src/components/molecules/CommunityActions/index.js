import React from 'react';
import styled from 'styled-components';
import { object, bool } from 'prop-types';

import GetCustomPricingButtonContainer from 'sly/containers/GetCustomPricingButtonContainer';

const CommunityActions = ({ community, isAlreadyPricingRequested }) => {
  const GetPricingButton = styled(GetCustomPricingButtonContainer)`
    width: 100%;
  `;

  return (
    <GetPricingButton
      community={community}
      hasAlreadyRequestedPricing={isAlreadyPricingRequested}
      ghost={isAlreadyPricingRequested}
      kind="jumbo"
    >
      {isAlreadyPricingRequested ? 'Pricing requested' : 'Get Pricing'}
    </GetPricingButton>
  );
};

CommunityActions.propTypes = {
  community: object.isRequired,
  isAlreadyPricingRequested: bool,
};

export default CommunityActions;
