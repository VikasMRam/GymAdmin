import React from 'react';
import { bool, string, object } from 'prop-types';

import GetCustomPricingContainer from 'sly/web/containers/GetCustomPricingContainer';
import { isCtaRecorded } from 'sly/web/services/helpers/localStorage';
import { Button, Block } from 'sly/common/system';
import { Checkmark } from 'sly/common/icons';

// const StyledButton = styled(Button)`
//   display: grid;
//   grid-template-columns: min-content min-content;
//   grid-gap: ${space('s')};
// `;


export default function GetCustomPricingButtonContainer({ hasAlreadyRequestedPricing, locTrack, ctaText, community, type, ...props }) {
  ctaText = 'Get Pricing and Availability';
  let pricingRequested = false;
  if (community && (isCtaRecorded(locTrack, community.id) || hasAlreadyRequestedPricing)) {
    // check if cta was already made
    ctaText = 'Pricing requested';
    pricingRequested = true;
  }
  return (
    <GetCustomPricingContainer hasAlreadyRequestedPricing={hasAlreadyRequestedPricing} locTrack={locTrack}>
      {getCustomPricing => hasAlreadyRequestedPricing ? (
        <Button sx={{ cursor: 'unset' }} justifyContent="center" display="grid" gridTemplateColumns="min-content min-content" gridGap="s" disabled={hasAlreadyRequestedPricing} onClick={getCustomPricing} {...props}>
          <Checkmark />
          <Block>Pricing Requested</Block>
        </Button>
      ) : (
        <Button data-buttonid="GetCommunityPricingAndAvailability"  onClick={getCustomPricing} {...props}>
          Get Pricing<Block display={type !== 'pricing' ? 'none' : 'initial'} sx$tablet={{ display: 'initial' }}> and Availability</Block>
        </Button>
      )}
    </GetCustomPricingContainer>
  );
}
GetCustomPricingButtonContainer.typeHydrationId = 'GetCustomPricingButtonContainer';
GetCustomPricingButtonContainer.propTypes = {
  hasAlreadyRequestedPricing: bool,
  locTrack: string,
  ctaText: string,
  community: object,
  type: string,
};

