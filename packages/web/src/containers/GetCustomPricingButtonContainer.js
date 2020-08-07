import React from 'react';
import { bool, string, object } from 'prop-types';

import GetCustomPricingContainer from 'sly/web/containers/GetCustomPricingContainer';
import { isCtaRecorded } from 'sly/web/services/helpers/localStorage';
import { Button } from 'sly/web/components/atoms';

export default function GetCustomPricingButtonContainer({ hasAlreadyRequestedPricing, locTrack, ctaText, community, ...props }) {

  ctaText = "Request Pricing and Availability";
  let ghost=false;
  if (community && isCtaRecorded(locTrack, community.id)) {
    //check if cta was already made
    ctaText = "Pricing requested";
    ghost=true;
  }

  return (
    <GetCustomPricingContainer hasAlreadyRequestedPricing={hasAlreadyRequestedPricing} locTrack={locTrack}>
      {getCustomPricing => <Button ghost={ghost} onClick={getCustomPricing} {...props}>{ctaText}</Button>}
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
