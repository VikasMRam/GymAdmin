import React from 'react';
import { bool, string, object } from 'prop-types';

import SlyTypeformAssessmentContainer from './SlyTypeformAssesmentContainer';

import GetCustomPricingContainer from 'sly/web/containers/GetCustomPricingContainer';
import { isCtaRecorded } from 'sly/web/services/helpers/localStorage';
import { Button, Block } from 'sly/common/system';
import { Checkmark } from 'sly/common/icons';


export default function SlyTypeformCustomPricingButtonContainer({ hasAlreadyRequestedPricing, locTrack, ctaText, community, type, formId, ...props }) {
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
        <SlyTypeformAssessmentContainer community={community} wizardType="POPUP_BUTTON" formId={formId} popupButtonName="Get Pricing" slug={community.id} popupButtonStyle={{ width: '100%', height: '100%', border: 'none' }} />
      )}
    </GetCustomPricingContainer>
  );
}
SlyTypeformCustomPricingButtonContainer.typeHydrationId = 'SlyTypeformCustomPricingButtonContainer';
SlyTypeformCustomPricingButtonContainer.propTypes = {
  hasAlreadyRequestedPricing: bool,
  locTrack: string,
  ctaText: string,
  community: object,
  type: string,
};

