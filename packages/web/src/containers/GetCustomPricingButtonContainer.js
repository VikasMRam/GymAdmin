import React from 'react';
import { bool, string, object } from 'prop-types';

import GetCustomPricingContainer from 'sly/web/containers/GetCustomPricingContainer';
import { isCtaRecorded } from 'sly/web/services/helpers/localStorage';
import { Button } from 'sly/web/components/atoms';
import IconButton from 'sly/common/components/molecules/IconButton';

export default function GetCustomPricingButtonContainer({ hasAlreadyRequestedPricing, locTrack, ctaText, community, ...props }) {

  ctaText = "Get Pricing and Availability";
  let ghost=false;
  if (community && (isCtaRecorded(locTrack, community.id) || hasAlreadyRequestedPricing)) {
    //check if cta was already made
    ctaText = "Pricing requested";
    ghost=true;
  }

  return (
    <GetCustomPricingContainer hasAlreadyRequestedPricing={hasAlreadyRequestedPricing} locTrack={locTrack}>
      {getCustomPricing => hasAlreadyRequestedPricing ? (
        <IconButton icon="tick" ghost={ghost} onClick={getCustomPricing} {...props}>
          Pricing Requested
        </IconButton>
      ) : (
        <Button data-buttonid="GetCommunityPricingAndAvailability" ghost={ghost} onClick={getCustomPricing} {...props}>
          Get Pricing and Availability
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
};
