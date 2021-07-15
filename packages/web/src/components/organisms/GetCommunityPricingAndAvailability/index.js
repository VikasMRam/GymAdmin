import React from 'react';
import { string, func, bool } from 'prop-types';
import styled from 'styled-components';

import { community as communityPropType } from 'sly/common/propTypes/community';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import { Button, Box, space } from 'sly/common/system';
import { Checkmark } from 'sly/common/icons';
import CommunityPricing from 'sly/web/components/molecules/CommunityPricing';

const StyledButton = fullWidth(Button);


const PaddedCommunityPricing = styled(CommunityPricing)`
  margin-bottom:${space('l')};
`;


const onClickEvent = id => ({ action: 'click-gcp-button-sidebar', category: 'PricingWizard', label: id });

const GetCommunityPricingAndAvailability = ({
  completedAssessment,
  community: {
    id,
    startingRate,
    rates,
    propInfo: { maxRate },
  },
  buttonTo,
  onClick,
  children,
}) => {
  return (
    <Box p="l !important" >
      {/* <PaddedHeading level="title" size="subtitle">Get Pricing and Availability</PaddedHeading> */}
      {startingRate > 0 && <PaddedCommunityPricing id={id} estimated={rates !== 'Provided'} price={startingRate} max={maxRate} />}
      <StyledButton sx={completedAssessment && { cursor: 'unset' }} disabled={completedAssessment} to={buttonTo} onClick={onClick} event={onClickEvent(id)}>
        {completedAssessment && <Checkmark mr="s" />}{completedAssessment ? 'Pricing Requested' : 'Get Pricing and Availability'}
      </StyledButton>
      {children}
    </Box>
  );
};
GetCommunityPricingAndAvailability.propTypes = {
  community: communityPropType,
  buttonTo: string,
  onClick: func,
  completedAssessment: bool,
};

export default GetCommunityPricingAndAvailability;
