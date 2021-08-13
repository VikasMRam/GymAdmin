import React from 'react';
import styled from 'styled-components';
import { bool, string } from 'prop-types';

import { size } from 'sly/common/components/themes';
import SlyTypeformCustomPricingButtonContainer from 'sly/web/profile/Typeform/SlyTypeformCustomPricingButtonContainer';

const GetPricingButton = styled(SlyTypeformCustomPricingButtonContainer)`
    margin-left: ${size('spacing.large')}
  `;

const SlyTypeformCommunityActions = ({ isAlreadyPricingRequested, locTrack, community, ...props }) => {
  return (
    <GetPricingButton
      hasAlreadyRequestedPricing={isAlreadyPricingRequested}
      locTrack={locTrack}
      community={community}
      {...props}
    >
      {isAlreadyPricingRequested ? 'Pricing requested' : 'Get Detailed Pricing'}
    </GetPricingButton>
  );
};

SlyTypeformCommunityActions.propTypes = {
  isAlreadyPricingRequested: bool,
  locTrack: string,
};

export default SlyTypeformCommunityActions;
