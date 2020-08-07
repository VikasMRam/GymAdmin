import React from 'react';
import { bool, string, object } from 'prop-types';
import styled from 'styled-components';

import GetCustomPricingContainer from 'sly/web/containers/GetCustomPricingContainer';
import { size } from 'sly/common/components/themes';
import { isCtaRecorded } from 'sly/web/services/helpers/localStorage';
import { Button, Icon } from 'sly/web/components/atoms';
import fullWidth from 'sly/web/components/helpers/fullWidth';;

const StyledButton = fullWidth(styled(Button)`
  display: grid;
  grid-template-columns: min-content min-content;
  grid-gap: ${size('spacing.medium')};
`);

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
      {getCustomPricing => <StyledButton ghost={ghost} onClick={getCustomPricing} {...props}>
        {hasAlreadyRequestedPricing && <><Icon icon="tick" /> {'Pricing Requested'}</> }
        {!hasAlreadyRequestedPricing && <>{'Get Pricing and Availability'}</> }
        </StyledButton>}
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
